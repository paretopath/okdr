// IPIP-NEO-120: International Personality Item Pool
// 120 items measuring the Big Five personality domains and 30 facets
// Public Domain — freely available from ipip.ori.org
// Goldberg, L. R., et al. (2006). The International Personality Item Pool and the future of public-domain personality measures.
//
// Response scale: 1=Very Inaccurate, 2=Moderately Inaccurate, 3=Neither, 4=Moderately Accurate, 5=Very Accurate
// reverse=true means the item is scored as (6 - response)

export interface BigFiveItem {
  id: string;
  text: string;
  domain: "openness" | "conscientiousness" | "extraversion" | "agreeableness" | "neuroticism";
  facet: string;
  reverse: boolean;
}

export const BIGFIVE_ITEMS: BigFiveItem[] = [
  // ══════════════════════════════════════════════════
  // OPENNESS TO EXPERIENCE (24 items, 6 facets)
  // ══════════════════════════════════════════════════

  // Fantasy
  { id: "n_fantasy_1",    text: "Have a vivid imagination.",         domain: "openness", facet: "n_fantasy",    reverse: false },
  { id: "n_fantasy_2",    text: "Enjoy wild flights of fantasy.",    domain: "openness", facet: "n_fantasy",    reverse: false },
  { id: "n_fantasy_3",    text: "Indulge in fantasies.",             domain: "openness", facet: "n_fantasy",    reverse: false },
  { id: "n_fantasy_4",    text: "Seldom daydream.",                  domain: "openness", facet: "n_fantasy",    reverse: true  },

  // Aesthetics
  { id: "n_aesthetics_1", text: "Believe in the importance of art.", domain: "openness", facet: "n_aesthetics", reverse: false },
  { id: "n_aesthetics_2", text: "See beauty in things that others might not notice.", domain: "openness", facet: "n_aesthetics", reverse: false },
  { id: "n_aesthetics_3", text: "Am moved by beautiful music.",      domain: "openness", facet: "n_aesthetics", reverse: false },
  { id: "n_aesthetics_4", text: "Do not like art.",                  domain: "openness", facet: "n_aesthetics", reverse: true  },

  // Feelings
  { id: "n_feelings_1",   text: "Experience my emotions intensely.", domain: "openness", facet: "n_feelings",   reverse: false },
  { id: "n_feelings_2",   text: "Feel others' emotions.",            domain: "openness", facet: "n_feelings",   reverse: false },
  { id: "n_feelings_3",   text: "Am deeply moved by others' misfortunes.", domain: "openness", facet: "n_feelings", reverse: false },
  { id: "n_feelings_4",   text: "Rarely notice my emotional reactions.", domain: "openness", facet: "n_feelings", reverse: true },

  // Actions
  { id: "n_actions_1",    text: "Prefer variety to routine.",        domain: "openness", facet: "n_actions",    reverse: false },
  { id: "n_actions_2",    text: "Like to visit new places.",         domain: "openness", facet: "n_actions",    reverse: false },
  { id: "n_actions_3",    text: "Prefer to stick with things that I know.", domain: "openness", facet: "n_actions", reverse: true },
  { id: "n_actions_4",    text: "Am interested in many things.",     domain: "openness", facet: "n_actions",    reverse: false },

  // Ideas
  { id: "n_ideas_1",      text: "Love to think up new ways of doing things.", domain: "openness", facet: "n_ideas", reverse: false },
  { id: "n_ideas_2",      text: "Enjoy examining myself and my life.", domain: "openness", facet: "n_ideas",    reverse: false },
  { id: "n_ideas_3",      text: "Avoid philosophical discussions.",  domain: "openness", facet: "n_ideas",      reverse: true  },
  { id: "n_ideas_4",      text: "Have read the great literary works.", domain: "openness", facet: "n_ideas",   reverse: false },

  // Values
  { id: "n_values_1",     text: "Believe that there is no absolute right and wrong.", domain: "openness", facet: "n_values", reverse: false },
  { id: "n_values_2",     text: "Tend to vote for liberal political candidates.", domain: "openness", facet: "n_values", reverse: false },
  { id: "n_values_3",     text: "Believe in one true religion.",     domain: "openness", facet: "n_values",     reverse: true  },
  { id: "n_values_4",     text: "Feel that laws should be strictly enforced.", domain: "openness", facet: "n_values", reverse: true },

  // ══════════════════════════════════════════════════
  // CONSCIENTIOUSNESS (24 items, 6 facets)
  // ══════════════════════════════════════════════════

  // Competence
  { id: "c_competence_1", text: "Am always prepared.",               domain: "conscientiousness", facet: "c_competence",  reverse: false },
  { id: "c_competence_2", text: "Complete tasks successfully.",       domain: "conscientiousness", facet: "c_competence",  reverse: false },
  { id: "c_competence_3", text: "Excel in what I do.",               domain: "conscientiousness", facet: "c_competence",  reverse: false },
  { id: "c_competence_4", text: "Find it difficult to get down to work.", domain: "conscientiousness", facet: "c_competence", reverse: true },

  // Order
  { id: "c_order_1",      text: "Like order.",                       domain: "conscientiousness", facet: "c_order",        reverse: false },
  { id: "c_order_2",      text: "Keep things tidy.",                 domain: "conscientiousness", facet: "c_order",        reverse: false },
  { id: "c_order_3",      text: "Leave a mess in my room.",          domain: "conscientiousness", facet: "c_order",        reverse: true  },
  { id: "c_order_4",      text: "Follow a schedule.",                domain: "conscientiousness", facet: "c_order",        reverse: false },

  // Dutifulness
  { id: "c_dutifulness_1", text: "Follow the rules.",               domain: "conscientiousness", facet: "c_dutifulness",  reverse: false },
  { id: "c_dutifulness_2", text: "Pay my bills on time.",           domain: "conscientiousness", facet: "c_dutifulness",  reverse: false },
  { id: "c_dutifulness_3", text: "Keep my promises.",               domain: "conscientiousness", facet: "c_dutifulness",  reverse: false },
  { id: "c_dutifulness_4", text: "Break rules.",                    domain: "conscientiousness", facet: "c_dutifulness",  reverse: true  },

  // Achievement Striving
  { id: "c_achievement_1", text: "Work hard.",                      domain: "conscientiousness", facet: "c_achievement",  reverse: false },
  { id: "c_achievement_2", text: "Do more than what's expected of me.", domain: "conscientiousness", facet: "c_achievement", reverse: false },
  { id: "c_achievement_3", text: "Set high standards for myself and others.", domain: "conscientiousness", facet: "c_achievement", reverse: false },
  { id: "c_achievement_4", text: "Put little time and effort into my work.", domain: "conscientiousness", facet: "c_achievement", reverse: true },

  // Self-Discipline
  { id: "c_discipline_1",  text: "Am always on time.",              domain: "conscientiousness", facet: "c_discipline",   reverse: false },
  { id: "c_discipline_2",  text: "Get chores done right away.",     domain: "conscientiousness", facet: "c_discipline",   reverse: false },
  { id: "c_discipline_3",  text: "Procrastinate.",                  domain: "conscientiousness", facet: "c_discipline",   reverse: true  },
  { id: "c_discipline_4",  text: "Have difficulty starting tasks.", domain: "conscientiousness", facet: "c_discipline",   reverse: true  },

  // Deliberation
  { id: "c_deliberation_1", text: "Think before I act.",           domain: "conscientiousness", facet: "c_deliberation", reverse: false },
  { id: "c_deliberation_2", text: "Make plans and stick to them.", domain: "conscientiousness", facet: "c_deliberation", reverse: false },
  { id: "c_deliberation_3", text: "Rush into things.",             domain: "conscientiousness", facet: "c_deliberation", reverse: true  },
  { id: "c_deliberation_4", text: "Make rash decisions.",          domain: "conscientiousness", facet: "c_deliberation", reverse: true  },

  // ══════════════════════════════════════════════════
  // EXTRAVERSION (24 items, 6 facets)
  // ══════════════════════════════════════════════════

  // Warmth
  { id: "e_warmth_1",      text: "Make friends easily.",            domain: "extraversion", facet: "e_warmth",          reverse: false },
  { id: "e_warmth_2",      text: "Feel comfortable around people.", domain: "extraversion", facet: "e_warmth",          reverse: false },
  { id: "e_warmth_3",      text: "Have a warm and caring nature.",  domain: "extraversion", facet: "e_warmth",          reverse: false },
  { id: "e_warmth_4",      text: "Am hard to get to know.",        domain: "extraversion", facet: "e_warmth",           reverse: true  },

  // Gregariousness
  { id: "e_gregariousness_1", text: "Enjoy being part of a loud crowd.", domain: "extraversion", facet: "e_gregariousness", reverse: false },
  { id: "e_gregariousness_2", text: "Like to go to parties.",           domain: "extraversion", facet: "e_gregariousness", reverse: false },
  { id: "e_gregariousness_3", text: "Prefer to be alone.",              domain: "extraversion", facet: "e_gregariousness", reverse: true  },
  { id: "e_gregariousness_4", text: "Avoid contact with others.",       domain: "extraversion", facet: "e_gregariousness", reverse: true  },

  // Assertiveness
  { id: "e_assertiveness_1", text: "Take charge.",                   domain: "extraversion", facet: "e_assertiveness",   reverse: false },
  { id: "e_assertiveness_2", text: "Have a strong personality.",     domain: "extraversion", facet: "e_assertiveness",   reverse: false },
  { id: "e_assertiveness_3", text: "Know how to captivate people.",  domain: "extraversion", facet: "e_assertiveness",   reverse: false },
  { id: "e_assertiveness_4", text: "Wait for others to lead the way.", domain: "extraversion", facet: "e_assertiveness", reverse: true  },

  // Activity
  { id: "e_activity_1",    text: "Am always busy.",                  domain: "extraversion", facet: "e_activity",        reverse: false },
  { id: "e_activity_2",    text: "Do a lot in my spare time.",       domain: "extraversion", facet: "e_activity",        reverse: false },
  { id: "e_activity_3",    text: "Like to take it easy.",            domain: "extraversion", facet: "e_activity",        reverse: true  },
  { id: "e_activity_4",    text: "React quickly.",                   domain: "extraversion", facet: "e_activity",        reverse: false },

  // Excitement Seeking
  { id: "e_excitement_1",  text: "Seek adventure.",                  domain: "extraversion", facet: "e_excitement",      reverse: false },
  { id: "e_excitement_2",  text: "Enjoy being reckless.",            domain: "extraversion", facet: "e_excitement",      reverse: false },
  { id: "e_excitement_3",  text: "Act wild and crazy.",              domain: "extraversion", facet: "e_excitement",      reverse: false },
  { id: "e_excitement_4",  text: "Prefer safe activities.",         domain: "extraversion", facet: "e_excitement",       reverse: true  },

  // Positive Emotions
  { id: "e_positiveEmotions_1", text: "Radiate joy.",               domain: "extraversion", facet: "e_positiveEmotions", reverse: false },
  { id: "e_positiveEmotions_2", text: "Have a lot of fun.",         domain: "extraversion", facet: "e_positiveEmotions", reverse: false },
  { id: "e_positiveEmotions_3", text: "Am full of life.",           domain: "extraversion", facet: "e_positiveEmotions", reverse: false },
  { id: "e_positiveEmotions_4", text: "Laugh a lot.",               domain: "extraversion", facet: "e_positiveEmotions", reverse: false },

  // ══════════════════════════════════════════════════
  // AGREEABLENESS (24 items, 6 facets)
  // ══════════════════════════════════════════════════

  // Trust
  { id: "a_trust_1",       text: "Trust others.",                   domain: "agreeableness", facet: "a_trust",           reverse: false },
  { id: "a_trust_2",       text: "Believe that others have good intentions.", domain: "agreeableness", facet: "a_trust", reverse: false },
  { id: "a_trust_3",       text: "Think that people mean well.",    domain: "agreeableness", facet: "a_trust",            reverse: false },
  { id: "a_trust_4",       text: "Distrust people.",                domain: "agreeableness", facet: "a_trust",            reverse: true  },

  // Straightforwardness
  { id: "a_straightforward_1", text: "Tell the truth.",             domain: "agreeableness", facet: "a_straightforward",  reverse: false },
  { id: "a_straightforward_2", text: "Rarely lie.",                 domain: "agreeableness", facet: "a_straightforward",  reverse: false },
  { id: "a_straightforward_3", text: "Cheat to get ahead.",         domain: "agreeableness", facet: "a_straightforward",  reverse: true  },
  { id: "a_straightforward_4", text: "Use flattery to get ahead.",  domain: "agreeableness", facet: "a_straightforward",  reverse: true  },

  // Altruism
  { id: "a_altruism_1",    text: "Make people feel welcome.",       domain: "agreeableness", facet: "a_altruism",         reverse: false },
  { id: "a_altruism_2",    text: "Am concerned about others.",      domain: "agreeableness", facet: "a_altruism",         reverse: false },
  { id: "a_altruism_3",    text: "Go out of my way to help others.", domain: "agreeableness", facet: "a_altruism",        reverse: false },
  { id: "a_altruism_4",    text: "Look down on others.",            domain: "agreeableness", facet: "a_altruism",         reverse: true  },

  // Compliance
  { id: "a_compliance_1",  text: "Hate to seem pushy.",             domain: "agreeableness", facet: "a_compliance",       reverse: false },
  { id: "a_compliance_2",  text: "Avoid imposing my will on others.", domain: "agreeableness", facet: "a_compliance",     reverse: false },
  { id: "a_compliance_3",  text: "Get back at others.",             domain: "agreeableness", facet: "a_compliance",       reverse: true  },
  { id: "a_compliance_4",  text: "Insult people.",                  domain: "agreeableness", facet: "a_compliance",       reverse: true  },

  // Modesty
  { id: "a_modesty_1",     text: "Dislike being the center of attention.", domain: "agreeableness", facet: "a_modesty",   reverse: false },
  { id: "a_modesty_2",     text: "Believe that I am better than others.",  domain: "agreeableness", facet: "a_modesty",   reverse: true  },
  { id: "a_modesty_3",     text: "Boast about my virtues.",                domain: "agreeableness", facet: "a_modesty",   reverse: true  },
  { id: "a_modesty_4",     text: "Think highly of myself.",                domain: "agreeableness", facet: "a_modesty",   reverse: true  },

  // Tender-Mindedness
  { id: "a_tenderMindedness_1", text: "Suffer from others' sorrows.",     domain: "agreeableness", facet: "a_tenderMindedness", reverse: false },
  { id: "a_tenderMindedness_2", text: "Feel sympathy for those who are worse off than myself.", domain: "agreeableness", facet: "a_tenderMindedness", reverse: false },
  { id: "a_tenderMindedness_3", text: "Am indifferent to the feelings of others.", domain: "agreeableness", facet: "a_tenderMindedness", reverse: true },
  { id: "a_tenderMindedness_4", text: "Try to understand others.",              domain: "agreeableness", facet: "a_tenderMindedness", reverse: false },

  // ══════════════════════════════════════════════════
  // NEUROTICISM (24 items, 6 facets)
  // ══════════════════════════════════════════════════

  // Anxiety
  { id: "neu_anxiety_1",   text: "Worry about things.",             domain: "neuroticism", facet: "neu_anxiety",          reverse: false },
  { id: "neu_anxiety_2",   text: "Fear for the worst.",             domain: "neuroticism", facet: "neu_anxiety",          reverse: false },
  { id: "neu_anxiety_3",   text: "Am afraid of many things.",       domain: "neuroticism", facet: "neu_anxiety",          reverse: false },
  { id: "neu_anxiety_4",   text: "Remain calm under pressure.",     domain: "neuroticism", facet: "neu_anxiety",          reverse: true  },

  // Hostility
  { id: "neu_hostility_1", text: "Get angry easily.",               domain: "neuroticism", facet: "neu_hostility",        reverse: false },
  { id: "neu_hostility_2", text: "Get irritated easily.",           domain: "neuroticism", facet: "neu_hostility",        reverse: false },
  { id: "neu_hostility_3", text: "Lose my temper.",                 domain: "neuroticism", facet: "neu_hostility",        reverse: false },
  { id: "neu_hostility_4", text: "Rarely get irritated.",           domain: "neuroticism", facet: "neu_hostility",        reverse: true  },

  // Depression
  { id: "neu_depression_1", text: "Dislike myself.",                domain: "neuroticism", facet: "neu_depression",       reverse: false },
  { id: "neu_depression_2", text: "Often feel blue.",               domain: "neuroticism", facet: "neu_depression",       reverse: false },
  { id: "neu_depression_3", text: "Feel that my life lacks direction.", domain: "neuroticism", facet: "neu_depression",   reverse: false },
  { id: "neu_depression_4", text: "Feel comfortable with myself.",  domain: "neuroticism", facet: "neu_depression",       reverse: true  },

  // Self-Consciousness
  { id: "neu_selfConsciousness_1", text: "Am easily embarrassed.",  domain: "neuroticism", facet: "neu_selfConsciousness", reverse: false },
  { id: "neu_selfConsciousness_2", text: "Am not bothered by difficult social situations.", domain: "neuroticism", facet: "neu_selfConsciousness", reverse: true },
  { id: "neu_selfConsciousness_3", text: "Feel comfortable talking in front of large groups.", domain: "neuroticism", facet: "neu_selfConsciousness", reverse: true },
  { id: "neu_selfConsciousness_4", text: "Only feel comfortable with friends.",              domain: "neuroticism", facet: "neu_selfConsciousness", reverse: false },

  // Impulsiveness
  { id: "neu_impulsiveness_1", text: "Eat too much.",               domain: "neuroticism", facet: "neu_impulsiveness",    reverse: false },
  { id: "neu_impulsiveness_2", text: "Spend money on impulse.",     domain: "neuroticism", facet: "neu_impulsiveness",    reverse: false },
  { id: "neu_impulsiveness_3", text: "Am able to control my cravings.", domain: "neuroticism", facet: "neu_impulsiveness", reverse: true },
  { id: "neu_impulsiveness_4", text: "Resist temptation.",          domain: "neuroticism", facet: "neu_impulsiveness",    reverse: true  },

  // Vulnerability
  { id: "neu_vulnerability_1", text: "Panic easily.",               domain: "neuroticism", facet: "neu_vulnerability",    reverse: false },
  { id: "neu_vulnerability_2", text: "Become overwhelmed by events.", domain: "neuroticism", facet: "neu_vulnerability",  reverse: false },
  { id: "neu_vulnerability_3", text: "Cannot make up my mind.",     domain: "neuroticism", facet: "neu_vulnerability",    reverse: false },
  { id: "neu_vulnerability_4", text: "Am able to handle a lot.",    domain: "neuroticism", facet: "neu_vulnerability",    reverse: true  },
];

export const DOMAIN_ORDER = [
  "openness",
  "conscientiousness",
  "extraversion",
  "agreeableness",
  "neuroticism",
] as const;
