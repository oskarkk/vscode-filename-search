import { Uri } from 'vscode';
import { getMockUri, mockRenderVars } from '.';
import { TemplateVars } from '../../webviews/webviews.interface';

const { imgDarkFolderUri, imgLightFolderUri } = mockRenderVars;

export const getMockTemplateVars = (
  templateVars: Partial<TemplateVars> = {},
  isEmpty: boolean = false
): TemplateVars => {
  return {
    cspSource: '34fdg5654dsf',
    cssFolderUri: isEmpty
      ? ({} as Uri)
      : getMockUri('', {
        scheme: 'file',
        authority: 'localhost',
        path: '/resources/css',
      }),
    imgDarkFolderUri: isEmpty ? ({} as Uri) : getMockUri('', { ...imgDarkFolderUri }),
    imgLightFolderUri: isEmpty ? ({} as Uri) : getMockUri('', { ...imgLightFolderUri }),
    nonce: 'test-nonce',
    scriptFolderUri: isEmpty
      ? ({} as Uri)
      : getMockUri('', {
        scheme: 'file',
        authority: 'localhost',
        path: '/resources/js',
      }),
    title: 'Workspaces',
    //TODO Fix this to be real values
    styleUri: isEmpty ? ({} as Uri) : getMockUri('', { ...imgDarkFolderUri }),
    codiconsUri: isEmpty ? ({} as Uri) : getMockUri('', { ...imgLightFolderUri }),
    ...templateVars,
  };
};
