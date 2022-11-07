import { ReportTemplateGenerator } from "./ReportTemplateGenerator"

class ReportTemplateFormHandler {
  public start = () => {
    const {
      reportTemplateForm,
      reportTemplateTextarea,
      reportFilenameTextarea,
    } = this.searchReportTemplateFormDOM()
    if (
      !reportTemplateForm ||
      !reportTemplateTextarea ||
      !reportFilenameTextarea
    )
      return

    this.placeholdDefaultTemplate(
      reportTemplateTextarea,
      reportFilenameTextarea
    )
    this.renderUserReportTemplate(
      reportTemplateTextarea,
      reportFilenameTextarea
    )
    this.storeUserReportTemplate(
      reportTemplateForm,
      reportTemplateTextarea,
      reportFilenameTextarea
    )
  }

  private searchReportTemplateFormDOM = () => {
    const reportTemplateForm = document.querySelector<HTMLFormElement>(
      "#save-report-template"
    )
    if (!reportTemplateForm)
      return {
        reportTemplateForm,
        reportTemplateTextarea: undefined,
        reportFilenameTextarea: undefined,
      }

    const reportTemplateTextarea =
      reportTemplateForm?.querySelector<HTMLTextAreaElement>("#report-template")
    const reportFilenameTextarea =
      reportTemplateForm?.querySelector<HTMLTextAreaElement>("#report-filename")

    return {
      reportTemplateForm,
      reportTemplateTextarea,
      reportFilenameTextarea,
    }
  }

  private storeUserReportTemplate = (
    reportTemplateForm: HTMLFormElement,
    reportTemplateTextarea: HTMLTextAreaElement,
    reportFilenameTextarea: HTMLTextAreaElement
  ) =>
    reportTemplateForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const reportTemplate = reportTemplateTextarea.value
      const reportFilename = reportFilenameTextarea.value
      chrome.storage.sync.set({ reportTemplate, reportFilename }, () =>
        alert(
          "Successfully saved!\nYour settings will be synced across your Chrome."
        )
      )
    })

  private renderUserReportTemplate = (
    reportTemplateTextarea: HTMLTextAreaElement,
    reportFilenameTextarea: HTMLTextAreaElement
  ) =>
    chrome.storage.sync.get(["reportTemplate", "reportFilename"], (storage) => {
      const { reportTemplate, reportFilename } = storage
      if (reportTemplate) reportTemplateTextarea.value = reportTemplate
      if (reportFilename) reportFilenameTextarea.value = reportFilename
    })

  private placeholdDefaultTemplate = (
    reportTemplateTextarea: HTMLTextAreaElement,
    reportFilenameTextarea: HTMLTextAreaElement
  ) => {
    reportTemplateTextarea.placeholder = ReportTemplateGenerator.defaultTemplate
    reportFilenameTextarea.placeholder = ReportTemplateGenerator.defaultFilename
  }
}

export { ReportTemplateFormHandler }
