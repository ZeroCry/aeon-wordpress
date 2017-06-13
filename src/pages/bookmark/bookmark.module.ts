import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookmarkPage } from './bookmark';
import { IonicImageLoader } from 'ionic-image-loader';

import { GridList } from '../../components/post-list/post-list.module';

@NgModule({
   declarations: [BookmarkPage],
   imports: [
      IonicPageModule.forChild(BookmarkPage),
      IonicImageLoader,
      GridList
   ],
   exports: [
      BookmarkPage
   ]
})
export class BookmarkPageModule { }