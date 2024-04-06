/**
* Copyright (c) 2021, salesforce.com, inc.
* All rights reserved.
* SPDX-License-Identifier: MIT
* For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
*/
/* LWR ESM Module Loader v0.12.2 */
function _optionalChain$1(ops) {
  let lastAccessLHS = undefined;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) {
      return undefined;
    }
    if (op === 'access' || op === 'optionalAccess') {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === 'call' || op === 'optionalCall') {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = undefined;
    }
  }
  return value;
}

/**
 * Simplified version of the AMD Import Metadata Resolver.
 * Just reads the ImportMetadata at construction time.
 */
class ImportResolver {
  __init() {
    this.importURICache = new Map();
  }
  __init2() {
    this.modifiers = '';
  }
  constructor(config) {
    ImportResolver.prototype.__init.call(this);
    ImportResolver.prototype.__init2.call(this);
    this.normalizeMetadata(config);
    // only fetch mappings if fingerprints is ON
    this.mappingEndpoint = _optionalChain$1([config, 'optionalAccess', _ => _.importMappings]) ? undefined : _optionalChain$1([config, 'optionalAccess', _2 => _2.endpoints, 'optionalAccess', _3 => _3.uris, 'access', _4 => _4.mapping]);
    if (_optionalChain$1([config, 'optionalAccess', _5 => _5.endpoints, 'optionalAccess', _6 => _6.modifiers])) {
      // Add URI modifiers to mapping endpoint query
      this.modifiers = Object.entries(config.endpoints.modifiers).reduce((q, [k, v]) => q += `${k}=${v}&`, '?');
    }
  }
  normalizeMetadata(importMetada) {
    // Normalize the URI cache to optimize retrieval
    if (importMetada && importMetada.imports) {
      for (const [uri, value] of Object.entries(importMetada.imports)) {
        if (uri && value) {
          const specifiers = Array.isArray(value) ? value : [];
          specifiers.forEach(specifier => {
            this.importURICache.set(specifier, uri);
          });
        }
      }
    }
  }
  async fetchMappings(specifier) {
    const mappingUri = `${this.mappingEndpoint}${encodeURIComponent(specifier)}${this.modifiers}`;
    const res = await globalThis.fetch(mappingUri);
    if (res.ok) {
      const mappings = await res.json();
      this.normalizeMetadata(mappings);
    }
  }
  async resolve(specifier) {
    let uri = this.importURICache.get(specifier);
    if (!uri && this.mappingEndpoint) {
      await this.fetchMappings(specifier);
      uri = this.importURICache.get(specifier);
    }
    return uri;
  }
}

/**
 * Simplified version of the AMD Import Metadata Resolver.
 * Just read the legacy ImportMap at construction time.
 */
class ImportResolverLegacy {
  constructor(importMap) {
    this.importURICache = importMap && importMap.imports ? importMap : {
      imports: {}
    };
  }

  /**
   * Resolves the URL for a specifier if it is in the global imports
   * This is using the pre-fingerprints importMappings syntax
   * @param specifier - Id of module we are looking for an id for
   */
  legacyResolve(specifier) {
    return this.importURICache.imports[specifier];
  }
}
function _optionalChain(ops) {
  let lastAccessLHS = undefined;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) {
      return undefined;
    }
    if (op === 'access' || op === 'optionalAccess') {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === 'call' || op === 'optionalCall') {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = undefined;
    }
  }
  return value;
}

// Singleton state:
let esmLoaderConfig;
let resolver;
let resolverLegacy;
function init(config) {
  // Save config from globalThis.LWR
  esmLoaderConfig = config;
  const {
    imports,
    index,
    importMappings,
    endpoints
  } = config;
  resolver = new ImportResolver({
    imports,
    index,
    endpoints,
    importMappings
  });
  resolverLegacy = new ImportResolverLegacy(importMappings);
}
async function load(specifier, importer) {
  const uri = await resolveUrl(specifier, importer);
  return import(uri);
}
async function resolveUrl(specifier, importer) {
  // HMR imports complete URIs when swapping out modules
  if (specifier.includes('://') || specifier.startsWith('/')) {
    return specifier;
  }
  if (!resolver || !resolverLegacy) {
    throw new Error('The ESM Loader was not initialized');
  }

  // Check if the URI is in the import metadata
  if (resolver) {
    const uri = await resolver.resolve(specifier);
    if (uri) {
      return uri;
    }
  }

  // Check if the URI is in the legacy import metadata
  if (resolverLegacy) {
    const uri = resolverLegacy.legacyResolve(specifier);
    if (uri) {
      return uri;
    }
  }
  const {
    endpoints
  } = esmLoaderConfig;
  if (!_optionalChain([endpoints, 'optionalAccess', _ => _.uris, 'optionalAccess', _2 => _2.module])) {
    throw new Error(`Unable to resolve the URL for "${specifier}"`);
  }

  // add the specifier and importer to the default URI
  let uri = endpoints.uris.module + encodeURIComponent(specifier);
  if (importer) {
    uri += `?importer=${encodeURIComponent(importer)}`;
  }
  if (endpoints.modifiers) {
    // Add URI modifiers to query
    uri += Object.entries(endpoints.modifiers).reduce((q, [k, v]) => q += `${k}=${v}&`, importer ? '&' : '?');
  }
  return uri;
}
export { init, load };