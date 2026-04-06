import {Injectable } from '@angular/core';


export interface User{
  id?: string, //optional property exists only in the angular app
  // Holds the Firestore document ID (doc.id) in the Angular app.
  // This value is NOT stored as a field in Firestore documents.
  // It is added when reading data from Firestore and is used 
  // to identify a user for update and delete operations.
  name: string,
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //signal property call users of array of Users type.

  //loadUsers( ) - Fetches (READ) all user documents from Firestore, converts them 
  // into usable objects, and update the Angular signal so the UI reacts automatically.
  
  //CREATE
  
  //UPDATE
  
  //DELETE
  
}
