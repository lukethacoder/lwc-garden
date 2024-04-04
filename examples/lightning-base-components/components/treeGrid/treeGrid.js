import { LightningElement } from 'lwc'
import {
  EXAMPLES_COLUMNS_DEFINITION_BASIC,
  EXAMPLES_DATA_BASIC,
} from './sampleData'

export default class TreeGrid extends LightningElement {
  // definition of columns for the tree grid
  gridColumns = EXAMPLES_COLUMNS_DEFINITION_BASIC

  // data provided to the tree grid
  gridData = EXAMPLES_DATA_BASIC
}
