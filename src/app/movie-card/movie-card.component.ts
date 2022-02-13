import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favs: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
  ) { }

  /**
   * Gets movies when initialized 
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavs();
  }

  /**
   * Get all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Get users favorite movies
   */
  getFavs(): void {
    this.fetchApiData.getUserProfile().subscribe((resp: any) => {
      this.favs = resp.FavoriteMovies;
      console.log(this.favs);
      return this.favs;
    });
  }

  /**
   * Checks if movie if favorited
   * @param id 
   * @returns 
   */
  isFavorited(id: string): boolean {
    return this.favs.includes(id);
  }

  /**
   * Adds a favorite movie
   * @param id 
   */
  handleFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovies(id).subscribe(() => {
      this.getFavs();
    })
  }

  /**
   * Deletes a favorite movie
   * @param id 
   */
  handleUnfavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovies(id).subscribe(() => {
      this.getFavs();
    })
  }

  /**
   * Open the director component to view info
   * @param name 
   * @param bio 
   * @param birth 
   */
  openDirector(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '500px'
    });
  }

  /**
   * Open the genre component to view info
   * @param name 
   * @param description 
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  /**
   * Open the synopisis component to view info
   * @param title 
   * @param imagePath 
   * @param description 
   */
  openSynopsis(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px'
    });
  }

}
