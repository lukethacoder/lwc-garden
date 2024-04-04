import { LightningElement } from 'lwc'
import Toast from 'lightning/toast'

export default class ToastExample extends LightningElement {
  onClick() {
    Toast.show(
      {
        label:
          'This is a toast label which shows {0}, you can learn more about its accessibility from {1}',
        labelLinks: [
          {
            url: 'https://www.lightningdesignsystem.com/components/toast/',
            label: 'LDS link',
          },
          {
            url: 'https://www.lightningdesignsystem.com/accessibility/guidelines/global-focus/#toasts',
            label: 'toast guideline',
          },
        ],
        message: 'I want to show a {salesforceLink} and a {slackLink}',
        messageLinks: {
          salesforceLink: {
            url: 'http://www.salesforce.com',
            label: 'Salesforce link',
          },
          slackLink: {
            url: 'https://slack.com',
            label: 'Slack link',
          },
        },
        mode: 'sticky',
        variant: 'info',
      },
      this
    )
  }
}
