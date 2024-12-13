import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface DoneItem {
  label: string;
  icon: string; // Add icon property
  formControl: FormControl;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    DragDropModule,
    CdkDropList,
    CdkDrag,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  todo = [
    { text: 'Text', icon: 'format_color_text' },
    { text: 'Category', icon: 'menu' },
    { text: 'Date', icon: 'date_range' },
    { text: 'Relationship', icon: 'group_work' },
    { text: 'Member', icon: 'person' },
    { text: 'Phone', icon: 'call' },
    { text: 'Email', icon: 'mail_outline' },
    { text: 'Number', icon: 'format_list_numbered' },
    { text: 'Link', icon: 'link' },
    { text: 'Image', icon: 'image' },
    { text: 'Money', icon: 'money' },
    { text: 'Progress', icon: 'bar_chart' },
    { text: 'Calculation', icon: 'business' },
    { text: 'Location', icon: 'location_on' },
    { text: 'Duration', icon: 'bedtime' },
  ];
  // done: { label: string; formControl: FormControl }[] = [];

  doneForm: FormGroup;
  done: DoneItem[] = [];

  constructor(private fb: FormBuilder) {
    this.doneForm = this.fb.group({
      items: this.fb.array([]), // Initialize empty form array
    });
  }
  removeItem(index: number) {
    this.done.splice(index, 1); // Remove the item from the 'done' array
  }

  get doneFormArray(): FormArray {
    return this.doneForm.get('items') as FormArray;
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer !== event.container) {
      // Add a new item to the 'done' list with a form control and icon
      const draggedItem = event.previousContainer.data[event.previousIndex];
      this.done.push({
        label: draggedItem.text,
        icon: draggedItem.icon, // Add icon to the done item
        formControl: new FormControl(''),
      });
    }
  }
}
// drop(event: CdkDragDrop<string[]>) {
//   // Allow moving items only from 'todo' to 'done'
//   if (event.previousContainer === event.container) {
//     // Handle reordering within the same list
//     moveItemInArray(
//       event.container.data,
//       event.previousIndex,
//       event.currentIndex
//     );
//   } else if (
//     event.previousContainer.data === this.todo &&
//     event.container.data === this.done
//   ) {
//     // Allow transferring items from 'todo' to 'done' only
//     transferArrayItem(
//       event.previousContainer.data,
//       event.container.data,
//       event.previousIndex,
//       event.currentIndex
//     );
//   }
// }
