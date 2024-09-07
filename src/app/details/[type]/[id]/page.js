import Details from '@/components/Details/Details';
import {
    fetchMovieDetails,
    fetchTvDetails,
    similarMovies,
    fetchMovies,
    fetchTv,
    fetchReviews,
} from "@/lib/api";

export default async function MovieDetailsPage({ params }) {
    const { type, id } = params;

    let movieData = null;
    try {
        // Fetch movie details server-side
        if (type === 'movie') {
            movieData = await fetchMovieDetails(id);
            if (!movieData) {
                console.error("Failed to fetch movie details");
            }
        } else {
            movieData = await fetchTvDetails(id);
            if (!movieData) {
                console.error("Failed to fetch TV details");
            }
        }
    } catch (error) {
        console.error("Error fetching movie or TV details:", error);
        movieData = {}; // Fallback to empty object
    }

    let recommendations = [];
    let reviews = [];

    try {
        // Fetch similar movies or TV shows
        recommendations = await similarMovies(type, id);
        if (!recommendations) {
            console.error("Failed to fetch recommendations");
            recommendations = await (type === 'movie' ? fetchMovies('popular') : fetchTv('popular'));
        }
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        recommendations = []; // Fallback to empty array
    }

    try {
        // Fetch reviews
        reviews = await fetchReviews(id, type);
        if (!reviews) {
            console.error("Failed to fetch reviews");
        }
    } catch (error) {
        console.error("Error fetching reviews:", error);
        reviews = []; // Fallback to empty array
    }

    // Return the page with data
    return (
        <Details
            params={params}
            movieData={movieData} // Pass the fetched data or empty object/array
            recommendations={recommendations}
            reviews={reviews}
        />
    );
}