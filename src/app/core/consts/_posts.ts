type Tag = {
  category: string;
  title: string;
  id: string;
};

export const POST_TAGS: Tag[] = [
  // Post Types
  { category: "Post Types", title: "Question", id: "question" },
  { category: "Post Types", title: "Discussion", id: "discussion" },
  { category: "Post Types", title: "Advice Needed", id: "advice_needed" },
  { category: "Post Types", title: "Resource Sharing", id: "resource_sharing" },
  { category: "Post Types", title: "Announcement", id: "announcement" },
  { category: "Post Types", title: "Success Story", id: "success_story" },
  { category: "Post Types", title: "Challenge", id: "challenge" },
  { category: "Post Types", title: "Opinion", id: "opinion" },
  { category: "Post Types", title: "Survey", id: "survey" },
  { category: "Post Types", title: "Event Info", id: "event_info" },
  { category: "Post Types", title: "Venting", id: "venting" },

  // Topic Areas
  { category: "Topic Areas", title: "Start-Up Basics", id: "startup_basics" },
  { category: "Topic Areas", title: "Market Research", id: "market_research" },
  { category: "Topic Areas", title: "Business Models", id: "business_models" },
  { category: "Topic Areas", title: "Funding Strategies", id: "funding_strategies" },
  { category: "Topic Areas", title: "Legal Issues", id: "legal_issues" },
  { category: "Topic Areas", title: "Technology Trends", id: "technology_trends" },
  { category: "Topic Areas", title: "Marketing & Sales", id: "marketing_sales" },
  { category: "Topic Areas", title: "Product Development", id: "product_development" },
  { category: "Topic Areas", title: "User Experience", id: "user_experience" },
  { category: "Topic Areas", title: "Team Building", id: "team_building" },

  // Specific Challenges
  { category: "Specific Challenges", title: "Pitching", id: "pitching" },
  { category: "Specific Challenges", title: "Investor Relations", id: "investor_relations" },
  { category: "Specific Challenges", title: "Co-founder Disputes", id: "cofounder_disputes" },
  { category: "Specific Challenges", title: "Hiring", id: "hiring" },
  { category: "Specific Challenges", title: "Scaling Problems", id: "scaling_problems" },
  { category: "Specific Challenges", title: "Customer Retention", id: "customer_retention" },
  { category: "Specific Challenges", title: "Bootstrapping Tips", id: "bootstrapping_tips" },
  { category: "Specific Challenges", title: "Burnout Prevention", id: "burnout_prevention" },
  { category: "Specific Challenges", title: "Productivity Hacks", id: "productivity_hacks" },
  { category: "Specific Challenges", title: "Remote Team Management", id: "remote_team_management" },

  // Industry-Specific
  { category: "Industry-Specific", title: "Tech Startups", id: "tech_startups" },
  { category: "Industry-Specific", title: "HealthTech", id: "healthtech" },
  { category: "Industry-Specific", title: "EduTech", id: "edutech" },
  { category: "Industry-Specific", title: "FinTech", id: "fintech" },
  { category: "Industry-Specific", title: "Retail Innovations", id: "retail_innovations" },
  { category: "Industry-Specific", title: "Green Businesses", id: "green_businesses" },
  { category: "Industry-Specific", title: "Food Industry Startups", id: "food_industry_startups" },
  { category: "Industry-Specific", title: "Creative Industries", id: "creative_industries" },
  { category: "Industry-Specific", title: "Manufacturing Innovations", id: "manufacturing_innovations" },
  { category: "Industry-Specific", title: "Service Industry", id: "service_industry" },

  // Development Phases
  { category: "Development Phases", title: "Ideation", id: "ideation" },
  { category: "Development Phases", title: "MVP Development", id: "mvp_development" },
  { category: "Development Phases", title: "Product Launch", id: "product_launch" },
  { category: "Development Phases", title: "Growth Strategies", id: "growth_strategies" },
  { category: "Development Phases", title: "Scaling Up", id: "scaling_up" },
  { category: "Development Phases", title: "Exit Strategies", id: "exit_strategies" },

  // Networking & Community
  { category: "Networking & Community", title: "Mentorship Requests", id: "mentorship_requests" },
  { category: "Networking & Community", title: "Networking Events", id: "networking_events" },
  { category: "Networking & Community", title: "Collaboration Opportunities", id: "collaboration_opportunities" },
  { category: "Networking & Community", title: "Community Feedback", id: "community_feedback" },
  { category: "Networking & Community", title: "Local Meetups", id: "local_meetups" },

  // Tools & Resources
  { category: "Tools & Resources", title: "Software Recommendations", id: "software_recommendations" },
  { category: "Tools & Resources", title: "Book Reviews", id: "book_reviews" },
  { category: "Tools & Resources", title: "Course Suggestions", id: "course_suggestions" },
  { category: "Tools & Resources", title: "Podcasts", id: "podcasts" },
  { category: "Tools & Resources", title: "Webinar Highlights", id: "webinar_highlights" },

  // Current Events
  { category: "Current Events", title: "Industry News", id: "industry_news" },
  { category: "Current Events", title: "Economic Trends", id: "economic_trends" },
  { category: "Current Events", title: "Policy Changes", id: "policy_changes" },
  { category: "Current Events", title: "Market Shifts", id: "market_shifts" },

  // Personal Experiences
  { category: "Personal Experiences", title: "Founder Stories", id: "founder_stories" },
  { category: "Personal Experiences", title: "Lessons Learned", id: "lessons_learned" },
  { category: "Personal Experiences", title: "Career Paths", id: "career_paths" },
  { category: "Personal Experiences", title: "Work-Life Balance", id: "work_life_balance" },

  // Miscellaneous
  { category: "Miscellaneous", title: "Inspirational Quotes", id: "inspirational_quotes" },
  { category: "Miscellaneous", title: "Casual Discussions", id: "casual_discussions" },
  { category: "Miscellaneous", title: "Off-Topic", id: "off_topic" },
  { category: "Miscellaneous", title: "Humor", id: "humor" },
  { category: "Miscellaneous", title: "Anniversaries & Milestones", id: "anniversaries_milestones" }
];
