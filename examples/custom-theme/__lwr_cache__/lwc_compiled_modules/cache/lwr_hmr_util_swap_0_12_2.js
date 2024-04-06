import { swapTemplate, swapStyle, swapComponent } from 'lwc';

export function updateStaleModule({ oldModule, newModule, specifier }) {
    if (specifier.endsWith('html') && newModule.default) {
        console.log(`Swapping html template for module "${specifier}"`);
        swapTemplate(oldModule.default, newModule.default);
    } else if (specifier.endsWith('css') && newModule.default) {
        swapStyle(oldModule.default[0], newModule.default[0]);
    } else {
        swapComponent(oldModule.default, newModule.default);
    }
}
