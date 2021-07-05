import { t } from 'vscode-ext-localisation';
import { listView, loadingView } from '..';
import { FS_WEBVIEW_WORKSPACE_CSS, FS_WEBVIEW_WORKSPACE_JS } from '../../../constants';
import { WorkspaceState } from '../../../webviews';
import { RenderVars, TemplateVars } from '../../../webviews/webviews.interface';
import { metaTags } from '../../common';
import { errorView } from '../views/errorView';
import { invalidView } from '../views/invalidView';

export const defaultTemplate = (
  {
    cspSource,
    cssFolderUri,
    imgDarkFolderUri,
    imgLightFolderUri,
    nonce,
    scriptFolderUri,
    title,
    styleUri,
    codiconsUri
  }: TemplateVars,
  state: WorkspaceState
): string => {
  const { state: view } = state;
  const renderVars: RenderVars = { imgDarkFolderUri, imgLightFolderUri };

  let titleAttr = t('views.title');
  let content = '';

  if (view === 'loading') {
    content = loadingView(state, renderVars);
  } else if (view === 'list') {
    titleAttr = t('webViews.workspace.viewTitle', { title });

    content = listView(state, renderVars);
  } else if (view === 'invalid') {
    content = invalidView(state, renderVars);
  } else if (view === 'error') {
    content = errorView(state, renderVars);
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${metaTags(nonce, cspSource)}
        <title>${titleAttr}</title>
        <link href="${cssFolderUri}/${FS_WEBVIEW_WORKSPACE_CSS}" nonce="${nonce}" rel="stylesheet" type="text/css">

        <link href="${styleUri}" rel="stylesheet" />
				<link href="${codiconsUri}" rel="stylesheet" />

      </head>

      <body>
        ${content}
        <script nonce="${nonce}" src="${scriptFolderUri}/${FS_WEBVIEW_WORKSPACE_JS}"></script>
      </body>
    </html>`;
};
