# Environment Variables

This project uses environment variables to configure authentication and API access.

## Required

```
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
AZURE_AD_CLIENT_ID=your-azure-client-id
AZURE_AD_CLIENT_SECRET=your-azure-client-secret
AZURE_AD_TENANT_ID=your-azure-tenant-id
ALLOWED_EMAILS=user1@example.com,user2@example.com
NEXT_PUBLIC_API_URL=https://serverdatabase.onrender.com/api/v1
```

## Notes

- `ALLOWED_EMAILS` is optional in development
- Do not commit `.env.local` to git
