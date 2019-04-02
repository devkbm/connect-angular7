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

  @ViewChild('articleGrid')
  articleGrid: ArticleGridComponent;

  @ViewChild('articleForm')
  articleForm: ArticleFormComponent;

  constructor() { }

  ngOnInit() {
  }

  public setBoardSelect(item): void {
    this.selectedBoard = item;
    this.getArticleGridData();
  }

  public getArticleGridData(): void {
    this.closeArticleDrawer();
    this.articleGrid.getArticleList(this.selectedBoard);
  }

  public openDrawer(): void {
    this.drawerVisible = true;
  }

  public closeDrawer(): void {
    this.drawerVisible = false;
  }

  public openArticleDrawer(): void {
    this.articleDrawerVisible = true;
  }

  public closeArticleDrawer(): void {
    this.articleDrawerVisible = false;
  }

  modifyBoard(item): void {
    this.boardForm.getBoard(item.key);
    this.openDrawer();
  }

  public getBoardTree(): void {
    this.closeDrawer();
    this.boardTree.getboardHierarchy();
  }

  public editArticle(item): void {
    this.articleForm.getArticle(item.pkArticle);
    this.openArticleDrawer();
  }

}
