import { Photo } from './photo.model';

export class Nearby {
  id: number;
  name: string;
  icon: string;
  rating: number;
  likeRatings: number[] = [];
  unlikeRatings: number[] = [];
  userRatingsTotal: number;
  photos: Photo[];

  constructor(id: number, name: string, icon: string, rating: number, userRatingsTotal: number, photos: Photo[], likeRatings: number[] = []) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.rating = rating;
    this.userRatingsTotal = userRatingsTotal;
    this.photos = photos;
  }
}
