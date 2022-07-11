import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from './components/post/post.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentComponent } from './components/comment/comment.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { ThreadListComponent } from './components/thread-list/thread-list.component';
import { TimeSincePipe } from './pipes/time-since.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    PostListComponent,
    PostComponent,
    CommentListComponent,
    CommentComponent,
    UserListComponent,
    PostFormComponent,
    CommentFormComponent,
    MessageBoxComponent,
    ThreadListComponent,
    TimeSincePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
