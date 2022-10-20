import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  uri = "http://localhost:3000/"

  constructor(private httpClient: HttpClient) { }

  imageUpload(formData: any) {
    return this.httpClient.post<any>(this.uri + 'api/upload', formData)
  }

  getImage(filename: string) {
    return this.httpClient.get<any>(this.uri + 'images/' + filename)
  }
}
