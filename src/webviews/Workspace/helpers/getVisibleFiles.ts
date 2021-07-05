import { workspace } from 'vscode';
import { File, Files } from '../..';
import { SortIds } from '../../../commands/registerCommands';
import { ConfigShowPaths } from '../../../constants';
import { findDuplicates, sortFilesByLabel } from '../../../utils';

export const getVisibleFiles = (wsFiles: Files, search: string, sort: SortIds) => {
  const showPaths: string =
    workspace.getConfiguration().get('filenameSearchSidebar.showPaths') || ConfigShowPaths.NEVER;

  const caseSensitive = workspace.getConfiguration().get('filenameSearchSidebar.caseSensitive');

  let visibleFiles = [...wsFiles];

  if (search) {
    if (caseSensitive) {
      visibleFiles = visibleFiles.filter(file => file.label.includes(search));
    } else {
      visibleFiles = visibleFiles.filter((file) => file.label.toLowerCase().includes(search.toLowerCase()));
    }
  }

  visibleFiles.sort(sortFilesByLabel);

  if (sort === 'descending') {
    visibleFiles.reverse();
  }

  if (showPaths === ConfigShowPaths.AS_NEEEDED) {
    const labels = visibleFiles.map((file) => file.label);
    const dups = findDuplicates(labels);

    visibleFiles = visibleFiles.map((file: File) => {
      if (!dups.includes(file.label)) {
        return { ...file, path: '' };
      }

      return file;
    });
  } else if (showPaths === ConfigShowPaths.NEVER) {
    visibleFiles = visibleFiles.map(
      (file): File => {
        return { ...file, path: '' };
      }
    );
  }

  return visibleFiles;
};
