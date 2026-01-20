import Layout from "../components/Layout";
import { Search, Filter, Star, ThumbsUp, MessageCircle, Trash2 } from "lucide-react";
import { useState } from "react";

interface Review {
  id: string;
  customer: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  product: string;
  verified: boolean;
  helpful: number;
}

const reviews: Review[] = [
  {
    id: "REV-001",
    customer: "John Smith",
    rating: 5,
    title: "Excellent Food Quality!",
    comment:
      "The Margherita Pizza was absolutely delicious! Fresh ingredients and perfectly cooked. Will definitely order again.",
    date: "2024-01-15",
    product: "Margherita Pizza",
    verified: true,
    helpful: 24,
  },
  {
    id: "REV-002",
    customer: "Sarah Johnson",
    rating: 4,
    title: "Great Burger Experience",
    comment:
      "Classic Burger tasted really good. The only issue was it took a bit longer than expected, but worth the wait.",
    date: "2024-01-14",
    product: "Classic Burger",
    verified: true,
    helpful: 18,
  },
  {
    id: "REV-003",
    customer: "Michael Chen",
    rating: 5,
    title: "Best Pizza I've Had",
    comment:
      "This is hands down the best pizza I've ever tasted! The crust is perfect, the sauce is flavorful, and the cheese is melty. Highly recommended!",
    date: "2024-01-13",
    product: "Margherita Pizza",
    verified: true,
    helpful: 32,
  },
  {
    id: "REV-004",
    customer: "Emma Wilson",
    rating: 3,
    title: "Good But Could Be Better",
    comment:
      "The Caesar Salad was okay, but the dressing could have been more generous. Still a decent option for a light meal.",
    date: "2024-01-12",
    product: "Caesar Salad",
    verified: true,
    helpful: 8,
  },
  {
    id: "REV-005",
    customer: "David Brown",
    rating: 5,
    title: "Amazing Taste and Quick Service",
    comment:
      "Ordered the Spaghetti Carbonara and it was absolutely perfect! The sauce was creamy, pasta was al dente, and delivery was fast.",
    date: "2024-01-11",
    product: "Spaghetti Carbonara",
    verified: true,
    helpful: 27,
  },
  {
    id: "REV-006",
    customer: "Lisa Anderson",
    rating: 4,
    title: "Love the Coffee",
    comment:
      "The Iced Latte is now my go-to drink. Perfect for hot days and has a great coffee taste. Will order weekly!",
    date: "2024-01-10",
    product: "Iced Latte",
    verified: true,
    helpful: 15,
  },
  {
    id: "REV-007",
    customer: "Robert Taylor",
    rating: 2,
    title: "Disappointing Experience",
    comment:
      "The food arrived cold and the packaging wasn't great. I expected better quality given the prices.",
    date: "2024-01-09",
    product: "Grilled Chicken Sandwich",
    verified: true,
    helpful: 12,
  },
  {
    id: "REV-008",
    customer: "Jennifer Lee",
    rating: 5,
    title: "Chocolate Cake is Heaven",
    comment:
      "This chocolate cake is to die for! Rich, moist, and absolutely delicious. I've ordered it multiple times now.",
    date: "2024-01-08",
    product: "Chocolate Cake",
    verified: true,
    helpful: 41,
  },
];

export default function Reviews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [reviewList, setReviewList] = useState(reviews);

  const filteredReviews = reviewList.filter(
    (review) =>
      (review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (ratingFilter === null || review.rating === ratingFilter)
  );

  const averageRating =
    (reviewList.reduce((sum, review) => sum + review.rating, 0) /
      reviewList.length)
      .toFixed(1);

  const handleDeleteReview = (id: string) => {
    setReviewList(reviewList.filter((review) => review.id !== id));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600";
    if (rating === 3) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reviews</h1>
          <p className="text-muted-foreground mt-1">
            Manage customer reviews and ratings.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs text-muted-foreground mb-1">Total Reviews</p>
            <p className="text-2xl font-bold text-foreground">{reviewList.length}</p>
            <p className="text-xs text-green-600 mt-2">↑ 8% from last month</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs text-muted-foreground mb-1">Average Rating</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-foreground">{averageRating}</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(parseFloat(averageRating))
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs text-muted-foreground mb-1">5 Star Reviews</p>
            <p className="text-2xl font-bold text-green-600">
              {reviewList.filter((r) => r.rating === 5).length}
            </p>
            <p className="text-xs text-green-600 mt-2">
              {(
                (reviewList.filter((r) => r.rating === 5).length /
                  reviewList.length) *
                100
              ).toFixed(0)}
              % of total
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs text-muted-foreground mb-1">Low Ratings</p>
            <p className="text-2xl font-bold text-red-600">
              {reviewList.filter((r) => r.rating <= 2).length}
            </p>
            <p className="text-xs text-red-600 mt-2">
              {reviewList.filter((r) => r.rating <= 2).length} need attention
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-sm w-full text-foreground placeholder:text-gray-400"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-foreground font-medium">
            <Filter className="w-5 h-5" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        {/* Rating Filter Buttons */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setRatingFilter(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              ratingFilter === null
                ? "bg-primary text-primary-foreground"
                : "bg-white border border-gray-200 text-foreground hover:bg-gray-50"
            }`}
          >
            All Ratings
          </button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setRatingFilter(rating)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                ratingFilter === rating
                  ? "bg-primary text-primary-foreground"
                  : "bg-white border border-gray-200 text-foreground hover:bg-gray-50"
              }`}
            >
              {rating}
              <Star className="w-4 h-4 fill-current" />
            </button>
          ))}
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {review.customer.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">
                        {review.customer}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Reviewed on {review.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`text-sm font-semibold ${getRatingColor(review.rating)}`}>
                      {review.rating}.0
                    </span>
                    {review.verified && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded">
                        Verified
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4">
                <p className="font-semibold text-foreground mb-2">{review.title}</p>
                <p className="text-foreground mb-2">{review.comment}</p>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  {review.product}
                </span>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful ({review.helpful})</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                  <MessageCircle className="w-4 h-4" />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-muted-foreground">
              No reviews found matching your search.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
