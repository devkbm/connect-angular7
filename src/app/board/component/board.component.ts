import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleGridComponent } from './article-grid.component';
import { BoardFormComponent } from './board-form.component';
import { BoardTreeComponent } from './board-tree.component';
import { ArticleFormComponent } from './article-form.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  drawerVisible = false;
  articleDrawerVisible = false;

  selectedBoard;

  @ViewChild('boardTree')
  boardTree: BoardTreeComponent;

  @ViewChild('boardForm')
  boardForm: BoardFormComponent;

  @ViewChild('articleForm')
  articleForm: ArticleFormComponent;
  
  constructor() { }

  ngOnInit() {
  }

  setBoardSelect(item, grid: ArticleGridComponent) {
    this.selectedBoard = item;
    grid.getArticleList(item);
  }

  openDrawer(): void {
    this.drawerVisible = true;
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  openArticleDrawer(): void {
    this.articleDrawerVisible = true;
  }

  closeArticleDrawer(): void {
    this.articleDrawerVisible = false;
  }

  modifyBoard(item): void {
    console.log(item);
    this.boardForm.getBoard(item.key);    
    this.openDrawer();
  }

  public getBoardTree(): void {
    this.closeDrawer();
    this.boardTree.getboardHierarchy();
    //getboardHierarchy
  }

}
