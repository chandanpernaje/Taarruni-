import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  ArrowRight,
  Calendar,
  Clock,
  Tag,
  X,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { BLOG_POSTS, BlogPost, COMPANY_INFO } from '../data/taarruniData';

export const BlogSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = [
    'All',
    'Digital Marketing',
    'Online Business',
    'E-Commerce',
    'SEO Strategy',
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.tags.some((t) => t.toLowerCase().includes(query)) ||
      post.paragraphs.some((p) => p.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-3">
            <BookOpen className="w-4 h-4" />
            <span>Official Insights & Strategy Articles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Taarruni <span className="gradient-text">Blog & Insights</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            Practical knowledge on digital marketing trends, e-commerce scale, and avoiding common online business mistakes from our Bangalore & US practitioners.
          </p>
        </div>

        {/* External Link to Blogspot */}
        <a
          href={COMPANY_INFO.contacts.blogUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white glass-card hover:bg-white/10 transition-colors border border-white/15 self-start md:self-auto shrink-0"
        >
          <span>Visit Taarruni Blogspot</span>
          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
        </a>
      </div>

      {/* Search Bar & Category Filter Bar */}
      <div className="p-4 sm:p-5 rounded-3xl glass-card border border-white/10 mb-10 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles by keyword, topic, or strategy (e.g. Google Ads, E-Commerce, COVID)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => setActiveArticle(post)}
            className="group rounded-3xl glass-card p-6 border border-white/10 hover:border-cyan-500/40 cursor-pointer transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Category, Date & Read Time */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-white/5">
                <span className="font-semibold text-cyan-400 uppercase tracking-wider text-[11px]">
                  {post.category}
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{post.date}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{post.readTime}</span>
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3 leading-snug">
                {post.title}
              </h3>

              {/* Summary */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                {post.summary}
              </p>
            </div>

            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {post.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-md bg-white/5 text-[11px] font-medium text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Read Article Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-white transition-colors">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}

        {filteredPosts.length === 0 && (
          <div className="col-span-full py-16 text-center rounded-3xl glass-card">
            <Search className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white mb-1">No articles found</h4>
            <p className="text-sm text-slate-400 max-w-sm mx-auto mb-4">
              We couldn't find any articles matching "{searchQuery}". Try searching for terms like "SEO", "Marketing", or "E-Commerce".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/15 transition-colors"
            >
              Reset Search Filter
            </button>
          </div>
        )}
      </div>

      {/* Full Article Lightbox Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0f0c1e] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[88vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6 shrink-0">
              <div className="pr-4">
                <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold mb-1">
                  <span>{activeArticle.category}</span>
                  <span>·</span>
                  <span>{activeArticle.date}</span>
                  <span>·</span>
                  <span>{activeArticle.readTime}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  {activeArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Article Content */}
            <div className="overflow-y-auto flex-1 pr-2 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-200 text-xs sm:text-sm italic mb-4">
                {activeArticle.summary}
              </div>

              {activeArticle.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              <div className="pt-4 border-t border-white/10">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Topics Covered
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeArticle.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-white/5 text-xs text-slate-300 font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between shrink-0">
              <a
                href={activeArticle.originalUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 font-medium"
              >
                <span>View on taarruni.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-md"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
