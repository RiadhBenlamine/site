// app/blog/page.tsx
"use client";

import { Calendar, Clock, ExternalLink, BookOpen } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface BlogPost {
    title: string;
    link: string;
    pubDate: string;
    author: string;
    thumbnail: string;
    description: string;
    categories: string[];
    guid: string;
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
    const [isVisible, setIsVisible] = useState(false);
    const [imageError, setImageError] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => { if (cardRef.current) observer.unobserve(cardRef.current); };
    }, []);

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric",
        });

    const getReadingTime = (description: string) => {
        const minutes = Math.ceil(description.split(" ").length / 200);
        return `${minutes} min read`;
    };

    const getImageUrl = () => {
        if (post.thumbnail) return post.thumbnail;
        const match = /<img[^>]+src="([^">]+)"/g.exec(post.description);
        return match?.[1] ?? null;
    };

    const imageUrl = getImageUrl();
    const cleanDesc = post.description.replace(/<[^>]*>/g, "").substring(0, 150);

    return (
        <div
            ref={cardRef}
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div className="relative flex flex-col h-full bg-[#070d1a]/80 border border-[rgba(0,245,255,0.12)] border-l-2 border-l-cyan-400/40
        backdrop-blur-md hover:border-[rgba(0,245,255,0.35)] hover:shadow-[0_0_30px_rgba(0,245,255,0.08)]
        transition-all duration-300 group hover:-translate-y-1.5">
                {/* Corner brackets */}
                <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-10" />
                <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-10" />

                {/* Thumbnail */}
                <div className="relative h-44 bg-gradient-to-br from-[#0a1128] to-[#070d1a] overflow-hidden border-b border-[rgba(0,245,255,0.08)]">
                    {imageUrl && !imageError ? (
                        <img
                            src={imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-70"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="absolute inset-0"
                                 style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(0,245,255,0.015) 10px,rgba(0,245,255,0.015) 11px)" }}
                            />
                            <BookOpen className="w-14 h-14 text-cyan-400/20 group-hover:scale-110 transition-transform duration-500" />
                        </div>
                    )}
                    {/* Scan line */}
                    <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[scan_3s_ease-in-out_infinite]"
                         style={{ animation: "scan 3s ease-in-out infinite" }}
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070d1a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Index badge */}
                    <span className="absolute top-3 right-3 font-['Oxanium',monospace] text-[0.6rem] tracking-[2px] text-cyan-400/60 bg-[#040810]/80 border border-[rgba(0,245,255,0.15)] px-2 py-0.5">
            #{String(index + 1).padStart(2, "0")}
          </span>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                    {/* Meta */}
                    <div className="flex flex-wrap gap-3 items-center font-['Oxanium',monospace] text-[0.62rem] tracking-wide text-slate-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
                {formatDate(post.pubDate)}
            </span>
                        <span className="text-slate-700">•</span>
                        <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
                            {getReadingTime(post.description)}
            </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-['Oxanium',monospace] font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 leading-snug line-clamp-2 text-[1rem]">
                        {post.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-400 leading-relaxed font-light line-clamp-3 flex-1">
                        {cleanDesc}…
                    </p>

                    {/* Categories */}
                    {post.categories?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                            {post.categories.slice(0, 3).map((cat, i) => (
                                <span key={i}
                                      className="font-['Oxanium',monospace] text-[0.58rem] tracking-wide text-pink-500 border border-pink-500/25 bg-pink-500/10 px-2 py-0.5">
                  {cat}
                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-5 pb-5 border-t border-[rgba(0,245,255,0.07)] pt-4">
                    <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-['Oxanium',monospace] text-[0.7rem] font-bold tracking-[2px] uppercase text-cyan-400 hover:gap-3 transition-all duration-200"
                    >
                        Read on Medium
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [headerVisible, setHeaderVisible] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
            { threshold: 0.1 }
        );
        if (headerRef.current) observer.observe(headerRef.current);
        return () => { if (headerRef.current) observer.unobserve(headerRef.current); };
    }, []);

    useEffect(() => {
        const fetchMediumPosts = async () => {
            try {
                const rssUrl = `https://medium.com/feed/@rbn0x00`;
                const response = await fetch(
                    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
                );
                if (!response.ok) throw new Error("Failed to fetch posts");
                const data = await response.json();
                if (data.status === "ok") {
                    setPosts(
                        data.items.map((item: any) => ({
                            title: item.title,
                            link: item.link,
                            pubDate: item.pubDate,
                            author: item.author,
                            thumbnail: item.thumbnail || extractImage(item.content || item.description),
                            description: item.description || item.content,
                            categories: item.categories || [],
                            guid: item.guid,
                        }))
                    );
                } else throw new Error("Invalid feed");
            } catch {
                setError("Failed to load blog posts. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchMediumPosts();
    }, []);

    const extractImage = (content: string) => {
        const match = /<img[^>]+src="([^">]+)"/.exec(content);
        return match?.[1] ?? "";
    };

    const formatDateShort = (dateString: string) =>
        new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric" });

    return (
        <section className="relative min-h-screen bg-[#040810] overflow-hidden">
            <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

            {/* Grid */}
            <div className="pointer-events-none fixed inset-0"
                 style={{ backgroundImage: "linear-gradient(rgba(0,245,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
            />
            {/* Ambient */}
            <div className="pointer-events-none fixed inset-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse,rgba(0,245,255,0.06)_0%,transparent_70%)]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse,rgba(255,0,110,0.05)_0%,transparent_70%)]" />
            </div>

            <div className="container mx-auto px-6 py-8 relative z-10">
                {/* Header */}
                <div
                    ref={headerRef}
                    className={`text-center mb-16 transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
                >
                    <div className="inline-flex items-center gap-2 font-['Oxanium',monospace] text-[0.65rem] font-semibold tracking-[3px] uppercase text-cyan-400 border border-cyan-400/30 px-5 py-2 bg-cyan-400/10 mb-6"
                         style={{ clipPath: "polygon(8px 0%,calc(100% - 8px) 0%,100% 50%,calc(100% - 8px) 100%,8px 100%,0% 50%)" }}>
                        ◈ BLOG & ARTICLES
                    </div>
                    <h2 className="font-['Oxanium',monospace] text-4xl md:text-6xl font-extrabold text-white mb-4">
                        Latest{" "}
                        <span className="text-cyan-400" style={{ textShadow: "0 0 30px rgba(0,245,255,0.5)" }}>
              Posts
            </span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Security research, CTF writeups, and technical articles about cybersecurity.
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                        <span className="font-['Oxanium',monospace] text-[0.7rem] tracking-[3px] text-slate-500 uppercase">
              Fetching Articles…
            </span>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="text-center py-24">
                        <p className="font-['Oxanium',monospace] text-pink-500 text-sm tracking-wide">{error}</p>
                    </div>
                )}

                {/* Posts */}
                {!loading && !error && posts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <BlogCard key={post.guid} post={post} index={posts.indexOf(post)} />
                        ))}
                    </div>
                )}

                {/* Empty */}
                {!loading && !error && posts.length === 0 && (
                    <div className="text-center py-24">
                        <BookOpen className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                        <p className="font-['Oxanium',monospace] text-slate-500 tracking-wide text-sm">No posts found</p>
                    </div>
                )}

                {/* Stats */}
                {!loading && !error && posts.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-16">
                        {[
                            { value: posts.length, label: "Total Posts" },
                            { value: new Set(posts.flatMap((p) => p.categories)).size, label: "Categories" },
                            { value: posts[0] ? formatDateShort(posts[0].pubDate) : "N/A", label: "Latest Post" },
                        ].map((s, i) => (
                            <div key={i}
                                 className="relative text-center p-6 bg-[#070d1a]/80 border border-[rgba(0,245,255,0.12)]
                  hover:border-[rgba(0,245,255,0.3)] hover:scale-105 transition-all duration-300
                  before:content-[''] before:absolute before:top-0 before:left-0 before:w-8 before:h-0.5 before:bg-cyan-400">
                                <div className="font-['Oxanium',monospace] text-3xl md:text-4xl font-extrabold text-cyan-400"
                                     style={{ textShadow: "0 0 20px rgba(0,245,255,0.4)" }}>
                                    {s.value}
                                </div>
                                <div className="font-['Oxanium',monospace] text-[0.65rem] tracking-[2px] uppercase text-slate-500 mt-2">
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}