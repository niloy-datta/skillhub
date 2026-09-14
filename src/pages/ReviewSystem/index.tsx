import { useState } from 'react';

export function ReviewSystem() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const reviews = [
    {
      id: 1,
      reviewer: 'TechCorp Inc.',
      avatar: '🏢',
      rating: 5,
      comment: 'Excellent work! Delivered the project ahead of schedule with exceptional quality. Highly recommended for any web development project.',
      date: '2024-01-15',
      project: 'Website Redesign',
      verified: true,
    },
    {
      id: 2,
      reviewer: 'StartupXYZ',
      avatar: '🚀',
      rating: 5,
      comment: 'Outstanding developer! Very professional, great communication, and delivered exactly what we needed. Will definitely work together again.',
      date: '2024-01-10',
      project: 'Mobile App Development',
      verified: true,
    },
    {
      id: 3,
      reviewer: 'DesignStudio',
      avatar: '🎨',
      rating: 4,
      comment: 'Great work overall. Good attention to detail and responsive to feedback. Would recommend for design-focused projects.',
      date: '2024-01-05',
      project: 'UI/UX Design',
      verified: true,
    },
    {
      id: 4,
      reviewer: 'WebAgency',
      avatar: '🌐',
      rating: 5,
      comment: 'Fantastic experience! The developer went above and beyond to ensure everything was perfect. Excellent problem-solving skills.',
      date: '2024-01-01',
      project: 'E-commerce Platform',
      verified: true,
    },
  ];

  const stats = {
    averageRating: 4.9,
    totalReviews: 47,
    fiveStar: 42,
    fourStar: 4,
    threeStar: 1,
    twoStar: 0,
    oneStar: 0,
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-2">
              Reviews & <span className="gradient-text">Ratings</span>
            </h1>
            <p className="text-xl text-gray-600">See what clients say about your work</p>
          </div>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="btn-shine px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-xl hover:shadow-2xl transition-all"
          >
            + Write Review
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Write a Review</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="text-5xl transition-all hover:scale-110"
                  >
                    <span className={star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'}>
                      ★
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-2">Your Review</label>
              <textarea
                rows={5}
                placeholder="Share your experience..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 outline-none transition-all resize-none"
              />
            </div>

            <div className="flex gap-4">
              <button className="btn-shine flex-1 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-xl hover:shadow-2xl transition-all">
                Submit Review
              </button>
              <button
                onClick={() => setShowReviewForm(false)}
                className="px-6 py-3 rounded-2xl border-2 border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Rating Stats */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-7xl font-black text-gray-900 mb-2">{stats.averageRating}</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} className="text-3xl text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-600 font-medium">Based on {stats.totalReviews} reviews</p>
            </div>
            <div className="space-y-3">
              {[
                { stars: 5, count: stats.fiveStar },
                { stars: 4, count: stats.fourStar },
                { stars: 3, count: stats.threeStar },
                { stars: 2, count: stats.twoStar },
                { stars: 1, count: stats.oneStar },
              ].map(item => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-700 w-12">{item.stars} star</span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                      style={{ width: `${(item.count / stats.totalReviews) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-700 w-12 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="card-hover bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  {review.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-gray-900">{review.reviewer}</h3>
                    {review.verified && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{review.project}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className={`text-xl ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
