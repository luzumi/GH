// services/image-caching.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageCachingService {
  private cache: Map<string, string> = new Map();

  cacheImage(url: string, base64: string): void {
    this.cache.set(url, base64);
  }

  isImageCached(url: string): boolean {
    return this.cache.has(url);
  }

  getCachedImage(url: string): string | null {
    return this.cache.get(url) || null;
  }
}
