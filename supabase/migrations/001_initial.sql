-- Oxford Kings Development Rating (OKDR) Database Schema

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- Assessments table: stores in-progress and completed assessment sessions
create table if not exists assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  started_at timestamptz default now() not null,
  completed_at timestamptz,
  iq_responses jsonb default '{}',      -- { itemId: selectedOptionIndex }
  bf_responses jsonb default '{}',      -- { itemId: 1-5 }
  status text default 'in_progress' check (status in ('in_progress', 'iq_complete', 'completed')),
  created_at timestamptz default now() not null
);

-- Results table: computed scores after assessment completion
create table if not exists results (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid references assessments(id) on delete cascade unique not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz default now() not null,

  -- IQ composite
  iq_full_scale integer check (iq_full_scale between 40 and 160),
  iq_percentile numeric(5,2),

  -- IQ subtest scaled scores (mean=10, SD=3; range 1-19)
  iq_matrix_scaled integer,
  iq_verbal_scaled integer,
  iq_numerical_scaled integer,
  iq_spatial_scaled integer,
  iq_working_memory_scaled integer,

  -- Big Five domain T-scores (mean=50, SD=10; range ~20-80)
  bf_openness numeric(5,2),
  bf_conscientiousness numeric(5,2),
  bf_extraversion numeric(5,2),
  bf_agreeableness numeric(5,2),
  bf_neuroticism numeric(5,2),

  -- All 30 facet T-scores as JSON
  -- { facetKey: tScore }
  bf_facets jsonb default '{}',

  -- Payment
  is_paid boolean default false,
  stripe_session_id text,
  stripe_payment_intent text
);

-- Row Level Security
alter table assessments enable row level security;
alter table results enable row level security;

-- Policies: users can only see their own data
create policy "Users can view own assessments"
  on assessments for select
  using (auth.uid() = user_id);

create policy "Users can insert own assessments"
  on assessments for insert
  with check (auth.uid() = user_id);

create policy "Users can update own assessments"
  on assessments for update
  using (auth.uid() = user_id);

create policy "Users can view own results"
  on results for select
  using (auth.uid() = user_id);

-- Service role can insert/update results (used by API routes)
create policy "Service role can manage results"
  on results for all
  using (true)
  with check (true);

-- Indexes
create index if not exists assessments_user_id_idx on assessments(user_id);
create index if not exists results_user_id_idx on results(user_id);
create index if not exists results_assessment_id_idx on results(assessment_id);
