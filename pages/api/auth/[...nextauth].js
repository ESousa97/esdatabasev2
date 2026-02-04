import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AzureADProvider from 'next-auth/providers/azure-ad';

/**
 * NextAuth Configuration
 *
 * Supports Google and Azure AD authentication providers.
 * Allowed emails are configured via environment variable.
 */
export default NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: {
        params: {
          scope: 'openid email profile User.Read offline_access',
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile }) {
      // Get allowed emails from environment variable (comma-separated)
      const allowedEmailsEnv = process.env.ALLOWED_EMAILS || '';
      const allowedEmails = allowedEmailsEnv
        .split(',')
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);

      // If no allowed emails configured, allow all (for development)
      if (allowedEmails.length === 0) {
        console.warn('Warning: No ALLOWED_EMAILS configured. Allowing all users.');
        return true;
      }

      // Collect all possible email addresses from the sign-in
      const userEmails = [user?.email, account?.email, profile?.email]
        .filter(Boolean)
        .map((email) => email.toLowerCase());

      // Check if any user email is in the allowed list
      const isAllowed = userEmails.some((email) => allowedEmails.includes(email));

      if (!isAllowed) {
        console.info(`Access denied for email(s): ${userEmails.join(', ')}`);
        return false;
      }

      return true;
    },

    async session({ session, token }) {
      // Add user id to session
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },

    async jwt({ token, user }) {
      // Persist user id to token
      if (user?.id) {
        token.sub = user.id;
      }
      return token;
    },
  },

  pages: {
    signIn: '/login',
    error: '/erro',
  },
});
