import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/*export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json?cb=' + new Date().getTime());
}*/

export function generateNewId(Ids: number[]): number {
  let newId: number;
  do {
    newId = Math.floor(Math.random() * 1000) + 1;
  } while (Ids.findIndex((id) => id == newId) != -1);
  return newId;
}

export function iconCellRender(valid: boolean): string {
  if (valid != null) {
    return (
      '<img style="height: 18px; width: 18px;" src="assets/img/icons/' +
      (valid ? 'valid.png' : 'invalid.png') +
      '" alt=image/>'
    );
  } else return '';
}

export function indexFormatter(index: string): string {
  return index.split('_').length > 1 &&
    index.split('_')[0] + '\r\nIndex ' + index.split('_')[1] ||
    index;
}
