-- Create a rate_limits table for tracking request rates by IP/email
CREATE TABLE public.rate_limits (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    identifier TEXT NOT NULL,
    identifier_type TEXT NOT NULL CHECK (identifier_type IN ('ip', 'email')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create an index for efficient querying
CREATE INDEX idx_rate_limits_identifier_created ON public.rate_limits(identifier, created_at DESC);

-- Enable RLS (allow edge functions with service role to access)
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- No public policies needed - only service role can access this table
-- Edge functions will use service role key to access this table

-- Create a function to clean up old rate limit records (older than 1 hour)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.rate_limits
  WHERE created_at < now() - interval '1 hour';
END;
$$;