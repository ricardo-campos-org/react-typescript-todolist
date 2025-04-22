ALTER TABLE tasknote.users
  ADD email_confirmed_at TIMESTAMP null,
  ADD email_uuid UUID UNIQUE NOT NULL;
