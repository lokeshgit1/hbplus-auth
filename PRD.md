# Product Requirements Document (PRD)

## Cross-Platform Google Authentication Application

**Project:** Domain-Restricted Authentication Application  
**Version:** 1.0  
**Status:** Draft  
**Prepared for:** Technical Assignment  
**Platforms:** Web, Android, iOS  
**Primary technology:** React Native with React Native for Web

---

## 1. Product Overview

### 1.1 Product Description

The product is a secure, cross-platform authentication application that allows users to sign in using their Google accounts and access a protected dashboard only if their email address belongs to an authorized organization.

The application will use a single React Native codebase to support web browsers and mobile platforms. Google OAuth 2.0 will provide authentication, while Firebase Authentication will manage user sessions and verify authenticated identities.

The application will restrict access to users whose email addresses end with the approved organizational domain:

`@hbplus.fit`

Users with personal Google accounts or accounts belonging to other domains will receive an access restriction message and will not be allowed to access the dashboard.

The application will also include a responsive user interface, protected navigation, logout functionality, loading states, and appropriate error handling.

### 1.2 Problem Statement

Organizations need a simple and secure way to restrict application access to their employees or authorized members without maintaining a separate username and password system.

The application must:

- Authenticate users using their Google accounts.
- Verify that the authenticated email belongs to an authorized domain.
- Prevent unauthorized users from accessing protected pages or application data.
- Maintain authentication state across supported platforms.
- Provide a consistent user experience on web, Android, and iOS.

### 1.3 Product Vision

To deliver a lightweight, secure, and professional cross-platform application that demonstrates enterprise-style authentication, domain-based authorization, and protected navigation using modern React Native technologies.

---

## 2. Product Goals and Objectives

### 2.1 Primary Goals

1. Implement Google Sign-In using a secure authentication provider.
2. Restrict access to users with an approved organizational email domain.
3. Provide a protected dashboard that is accessible only to authorized users.
4. Support web, Android, and iOS from a shared React Native codebase.
5. Demonstrate secure authentication, session management, and logout.
6. Deliver a clean and professional user interface.
7. Provide clear project documentation and a deployable web application.

### 2.2 Success Metrics

| Metric | Success criteria |
|---|---|
| Authorized authentication | Valid organizational accounts can sign in successfully |
| Unauthorized authentication | Accounts from other domains cannot access protected content |
| Route protection | Direct access to protected routes is denied without an authorized session |
| Session persistence | Valid sessions survive application refreshes where supported |
| Logout | Logout invalidates the application session and returns the user to login |
| Cross-platform support | Authentication and navigation work on web, Android, and iOS |
| Responsive design | Login and dashboard layouts work on mobile and desktop screen sizes |
| Documentation | Repository includes complete setup, authentication, and deployment instructions |

---

## 3. Scope

### 3.1 In Scope

- Google OAuth 2.0 authentication.
- Firebase Authentication integration.
- Email-domain validation.
- Authorized and unauthorized authentication handling.
- Login page.
- Protected dashboard.
- Logout functionality.
- Authentication loading and error states.
- Protected navigation and route handling.
- Responsive user interface.
- Shared React Native codebase.
- Web deployment.
- Environment configuration.
- GitHub repository and README documentation.
- Basic security and authentication testing.

### 3.2 Out of Scope

The following features are not required for the initial assignment:

- Email and password authentication.
- Password reset functionality.
- Multi-factor authentication.
- User registration forms.
- Organization management.
- Employee invitation workflows.
- Advanced administrative dashboards.
- Subscription or payment functionality.
- Complex role and permission management.
- Enterprise single sign-on integrations other than Google.
- Full audit logging and security monitoring infrastructure.

These features may be considered for future development.

---

## 4. Target Users

### 4.1 Authorized Users

Employees or approved members of the organization who possess a Google account associated with the approved domain.

Example:

`employee@hbplus.fit`

Expected behavior:

- Successfully authenticate using Google.
- Pass domain validation.
- Access the protected dashboard.
- View their account information.
- Log out securely.

### 4.2 Unauthorized Users

Users whose Google accounts do not belong to the approved domain.

Examples:

- `example@gmail.com`
- `user@yahoo.com`
- `employee@anothercompany.com`

Expected behavior:

- Authentication is rejected for application access.
- The dashboard remains inaccessible.
- An appropriate error message is displayed.
- The user can return to the login page.

---

## 5. Technology Stack

### 5.1 Recommended Technologies

| Technology | Purpose |
|---|---|
| React Native | Shared cross-platform application framework |
| React Native for Web | Web rendering and browser compatibility |
| Expo | Development environment and cross-platform tooling |
| TypeScript | Type safety and maintainability |
| Firebase Authentication | Google authentication and session management |
| React Navigation | Application navigation |
| React Native Web-compatible navigation | Web route support |
| React Context API | Authentication state management |
| AsyncStorage | Native authentication persistence where required |
| Firebase SDK | Authentication integration |
| Netlify | Web application deployment |
| GitHub | Source code repository and version control |

### 5.2 Architecture Decision

The recommended implementation uses Expo with React Native and React Native for Web.

Firebase Authentication will handle Google sign-in and identity verification.

The application will use a shared authentication interface with platform-specific implementations where necessary.

For example:

- Web authentication will use Firebase's browser-based Google authentication flow.
- Android and iOS authentication will use the supported native Google authentication flow with Firebase credentials.

This approach allows the same business logic and user interface to be reused across platforms while accommodating platform-specific authentication requirements.

### 5.3 Backend Decision

Firebase Authentication is recommended because it provides:

- Google authentication integration.
- Verified identity information.
- Authentication session management.
- Token-based authentication.
- Support for web and mobile applications.
- Firebase Security Rules for protecting data.

A separate database is optional for the initial assignment. User profile information may be stored in Firestore as a bonus feature.

---

## 6. User Stories

### 6.1 Authentication

**US-01:** As an authorized employee, I want to sign in using my Google account so that I can access the application without creating a separate password.

**US-02:** As an unauthorized user, I want to receive a clear explanation when my email domain is not permitted.

**US-03:** As an authenticated user, I want my session to persist when I refresh the application so that I do not need to log in repeatedly.

### 6.2 Dashboard

**US-04:** As an authorized user, I want to view a dashboard containing my profile information so that I can confirm my account is authenticated.

**US-05:** As an unauthenticated user, I want protected pages to redirect me to the login page.

**US-06:** As an authenticated user, I want to log out so that my account is no longer accessible from the application.

### 6.3 Application Experience

**US-07:** As a user, I want to see a loading indicator during authentication so that I understand the application is processing my request.

**US-08:** As a mobile or web user, I want the interface to adapt to my screen size so that the application remains usable on my device.

---

## 7. Functional Requirements

### FR-01: Google Sign-In

The application must provide a Google Sign-In button on the login page.

When the user selects the button:

1. The application initiates Google authentication.
2. The user selects or confirms their Google account.
3. Google authenticates the user.
4. Firebase Authentication establishes the authenticated session.
5. The application receives the authenticated user's identity.
6. The application evaluates the user's authorization.
7. Authorized users are redirected to the dashboard.
8. Unauthorized users receive an access restriction message.

The login button must be disabled while authentication is in progress.

### FR-02: Email-Domain Validation

The application must validate the authenticated user's email address.

The initial allowed domain is:

`hbplus.fit`

The application must:

- Confirm that an authenticated email address exists.
- Normalize the email address before comparison.
- Compare the email domain against the approved domain.
- Reject missing, invalid, or unauthorized email addresses.
- Prevent unauthorized users from accessing protected content.

The domain comparison must match the complete domain.

For example:

| Email | Result |
|---|---|
| `employee@hbplus.fit` | Allowed |
| `employee@gmail.com` | Denied |
| `employee@anothercompany.com` | Denied |
| `employee@hbplus.fit.example.com` | Denied |
| `employee@sub.hbplus.fit` | Denied unless explicitly approved |

The initial implementation will allow only the exact domain `hbplus.fit`.

**Important:** Email-domain validation is an authorization decision, not merely a user interface check. It must be enforced by the trusted authentication or backend layer.

### FR-03: Login Page

The login page must include:

- Application name or organization branding.
- A short description of the application's purpose.
- A Google Sign-In button.
- An optional organization domain notice.
- A loading indicator.
- An error message area.
- Responsive layout for mobile and desktop.

Suggested content:

**Welcome to HB Plus**

Sign in using your official organizational Google account to continue.

Button: Continue with Google

Notice: Access is restricted to authorized @hbplus.fit accounts.

### FR-04: Protected Dashboard

The dashboard must be accessible only to authenticated and authorized users.

The dashboard should display:

- Welcome message.
- User's name.
- User's email address.
- User's profile picture, when available.
- Authentication status.
- Logout button.

Example:

Welcome, Employee

`employee@hbplus.fit`

You are successfully authenticated.

The dashboard must not render protected information before the authentication and authorization checks have completed.

### FR-05: Logout

The application must provide a logout button.

When the user logs out:

1. Firebase Authentication must sign out the user.
2. Application authentication state must be cleared.
3. Protected navigation must no longer be accessible.
4. The user must be redirected to the login page.
5. A subsequent attempt to access the dashboard must require authentication again.

### FR-06: Authentication Loading State

The application must provide loading feedback during:

- Initial authentication state restoration.
- Google authentication.
- Firebase authentication.
- Domain authorization checks.
- Logout processing.

The loading indicator must prevent duplicate authentication requests and premature navigation.

### FR-07: Error Handling

The application must handle the following conditions:

| Error condition | Expected behavior |
|---|---|
| Unauthorized domain | Display the access restriction message |
| User cancels Google login | Return to login without treating cancellation as an application error |
| Network failure | Display a retry option |
| Authentication failure | Display a clear error message |
| Missing email | Reject access |
| Expired or invalid session | Require authentication again |
| Firebase configuration error | Display a safe error and log diagnostic details |
| Unauthorized direct URL access | Redirect to login |

The application must not display sensitive authentication tokens or internal error details to the user.

---

## 8. Authentication and Authorization Flow

### 8.1 Standard Authentication Flow

1. User opens the application.
2. The application checks the existing authentication session.
3. If no session exists, the login page is displayed.
4. The user clicks Continue with Google.
5. Google authenticates the user.
6. Firebase Authentication establishes the user session.
7. The application verifies the authenticated identity.
8. The application checks the user's email domain.
9. If the domain is approved, the user is authorized.
10. The application redirects the user to the dashboard.

### 8.2 Unauthorized Authentication Flow

1. User opens the login page.
2. User clicks Continue with Google.
3. Google authenticates the user.
4. Firebase Authentication establishes the session.
5. The application evaluates the user's email domain.
6. The domain does not match the approved domain.
7. Application access is denied.
8. The user is signed out of the application.
9. The application displays the access restriction message.

**Required error message:**

"Access restricted. Please login using your official domain email."

### 8.3 Authentication State Model

The application should use the following authentication states:

| State | Description |
|---|---|
| Initializing | Restoring the existing authentication session |
| Unauthenticated | No authenticated user exists |
| Authenticating | Google authentication is in progress |
| Authorizing | Authenticated identity is being checked |
| Authorized | User has an approved email domain |
| Rejected | User does not meet access requirements |
| Error | An unexpected authentication error occurred |

Only the `Authorized` state may access protected application routes.

### 8.4 Authentication State Transitions

The expected transitions are:

- Initializing → Unauthenticated
- Initializing → Authorizing
- Unauthenticated → Authenticating
- Authenticating → Authorizing
- Authorizing → Authorized
- Authorizing → Rejected
- Authorized → Unauthenticated, after logout
- Authorized → Authorizing, after a relevant authentication change

Unexpected authentication failures must transition to an appropriate error or unauthenticated state.

---

## 9. Security Requirements

### SEC-01: Trusted Authentication

The application must use Google authentication through Firebase Authentication.

The application must not trust user-provided email addresses or locally stored authorization flags.

### SEC-02: Verified Identity

The application must rely on authenticated identity information supplied by Firebase.

The user's email must be verified before granting access.

The application should validate the Firebase ID token when authorization is performed by a trusted backend.

### SEC-03: Domain Authorization

Domain authorization must be enforced beyond the login interface.

For Firebase-backed application data, authorization must be enforced through Firebase Security Rules or a trusted backend.

If a backend is introduced, it must validate the Firebase ID token and enforce the allowed domain before returning protected data.

### SEC-04: Protected Navigation

The dashboard must not be accessible to unauthenticated or unauthorized users.

Protected routes must be guarded using the application's authentication state.

Web route guards are not a substitute for backend authorization.

### SEC-05: Token Handling

The application must:

- Use Firebase Authentication to manage authentication sessions.
- Avoid manually storing Google access tokens in local storage.
- Avoid exposing tokens in URLs or application logs.
- Avoid storing tokens in plaintext application data.
- Use platform-appropriate secure persistence.
- Handle token expiration and session refresh through Firebase.
- Clear application session state during logout.

### SEC-06: Environment Configuration

Firebase configuration must be managed through environment variables or platform-specific configuration files.

Private service account credentials and backend secrets must never be committed to the repository.

Firebase client configuration is not equivalent to a private service account credential. Client configuration must still be protected by appropriate authentication and authorization controls.

### SEC-07: Authorization Failure

If the user's domain is not authorized, the application must not leave the user in an authenticated application state.

The application must sign the user out and prevent access to protected content.

---

## 10. UI and UX Requirements

### 10.1 Design Principles

The application must follow a clean, professional, and minimal visual design.

The interface should prioritize:

- Simple navigation.
- Clear typography.
- Consistent spacing.
- Readable text.
- Responsive components.
- Accessible controls.
- Consistent branding.

### 10.2 Login Page Layout

The login page should contain:

1. Application logo or organization name.
2. Welcome heading.
3. Supporting description.
4. Google Sign-In button.
5. Domain restriction notice.
6. Loading and error feedback.

The main content should be centered within a responsive container.

On desktop, the content should have a comfortable maximum width. On mobile, the layout should fit the available screen without horizontal scrolling.

### 10.3 Dashboard Layout

The dashboard should contain:

- Application header.
- User profile information.
- Welcome message.
- Dashboard content area.
- Logout action.

The dashboard may initially contain a simple welcome card because the assignment focuses on authentication rather than business functionality.

### 10.4 Responsive Behavior

The application must support:

- Desktop browsers.
- Mobile browsers.
- Android emulator or device.
- iOS simulator or device.

Responsive layouts must adapt to available screen dimensions.

Interactive controls must be appropriately sized for touch input on mobile devices.

---

## 11. Navigation and Route Protection

### 11.1 Required Routes

| Route | Access |
|---|---|
| `/login` | Public |
| `/dashboard` | Authorized users only |

### 11.2 Navigation Rules

When the user is unauthenticated:

- Accessing `/dashboard` must redirect to `/login`.
- The login page must be displayed.
- Protected dashboard content must not be rendered.

When the user is authorized:

- Accessing `/login` may redirect to `/dashboard`.
- Accessing `/dashboard` must display the dashboard.

When the user is unauthorized:

- The application must deny access.
- The dashboard must not be rendered.
- The user must return to the login page.

The navigation implementation must support web URL routing and native application navigation.

---

## 12. Data Requirements

### 12.1 User Information

The application may use the following user attributes:

| Field | Description |
|---|---|
| `uid` | Unique Firebase user identifier |
| `displayName` | User's Google display name |
| `email` | Authenticated email address |
| `photoURL` | Profile image URL, if available |
| `emailVerified` | Email verification status |
| `role` | Optional application role |
| `createdAt` | Optional account creation timestamp |

The initial application does not require a separate user database.

Firebase Authentication may provide the profile information required by the dashboard.

### 12.2 Optional Firestore Storage

As a bonus feature, the application may store authorized user profiles in Firestore.

Suggested collection:

`users`

Suggested document identifier:

Firebase Authentication UID.

The document may contain the user's profile information, role, and creation timestamp.

Firestore access must be restricted using Security Rules.

User profile data must not be written for unauthorized users.

---

## 13. Optional Role-Based Access

Role-based access control is a bonus feature and is not required for the initial implementation.

If implemented, the application may support:

- Admin
- User

Example permissions:

| Feature | Admin | User |
|---|---|---|
| Access dashboard | Yes | Yes |
| View own profile | Yes | Yes |
| View user management | Yes | No |
| Manage application roles | Yes | No |

Roles must be assigned and verified through a trusted source.

The application must not allow users to assign themselves administrative privileges by modifying local application state or profile data.

---

## 14. Proposed Folder Structure

The project should use a clean, modular folder structure.

```text
hbplus-auth/
├── src/
│   ├── components/
│   │   ├── GoogleSignInButton.tsx
│   │   ├── LoadingIndicator.tsx
│   │   └── ErrorMessage.tsx
│   │
│   ├── screens/
│   │   ├── LoginScreen.tsx
│   │   └── DashboardScreen.tsx
│   │
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   ├── context/
│   │   └── AuthContext.tsx
│   │
│   ├── services/
│   │   ├── authService.ts
│   │   └── firebase.ts
│   │
│   ├── hooks/
│   │   └── useAuth.ts
│   │
│   ├── utils/
│   │   └── domainValidation.ts
│   │
│   ├── constants/
│   │   └── config.ts
│   │
│   ├── types/
│   │   └── auth.types.ts
│   │
│   └── styles/
│       └── theme.ts
│
├── assets/
├── .env.example
├── .gitignore
├── app.json
├── package.json
├── tsconfig.json
├── README.md
└── PRD.md
```

The exact folder structure may be adjusted according to the selected Expo and navigation configuration.

---

## 15. Implementation Requirements

### 15.1 Authentication Service

The authentication service should expose the following operations:

- `signInWithGoogle()`
- `signOut()`
- `getCurrentUser()`
- `subscribeToAuthChanges()`
- `validateUserDomain()`

Authentication logic must remain separate from the user interface.

### 15.2 Domain Validation Utility

The domain validation utility must accept an authenticated email address and return whether the email belongs to the approved domain.

Example:

```ts
const ALLOWED_DOMAIN = "hbplus.fit";

function isAllowedDomain(email: string): boolean {
  const normalizedEmail = email.trim().toLowerCase();

  const emailParts = normalizedEmail.split("@");

  if (emailParts.length !== 2) {
    return false;
  }

  return emailParts[1] === ALLOWED_DOMAIN;
}
```

This utility is intended for application-level validation.

The trusted authentication or backend layer must independently enforce authorization before granting access to protected data.

### 15.3 Authentication Context

The authentication context should maintain:

- Current authenticated user.
- Authentication initialization status.
- Authorization status.
- Loading status.
- Authentication error.

The context should provide login and logout methods to the rest of the application.

### 15.4 Protected Route

The protected route component should:

1. Check whether authentication is initializing.
2. Display a loading indicator while the state is being restored.
3. Redirect unauthenticated users to the login page.
4. Reject unauthorized users.
5. Render protected content only when the user is authorized.

---

## 16. Testing Requirements

### 16.1 Authentication Tests

| Test case | Expected result |
|---|---|
| Authorized Google account | Login succeeds |
| Gmail account | Access is rejected |
| Different organizational domain | Access is rejected |
| Missing email | Access is rejected |
| Invalid email | Access is rejected |
| Cancelled Google authentication | User remains on login page |
| Network failure | Error message is displayed |
| Successful logout | User returns to login page |

### 16.2 Route Protection Tests

| Test case | Expected result |
|---|---|
| Open dashboard without login | Redirect to login |
| Refresh dashboard while authorized | Dashboard remains accessible |
| Refresh dashboard while unauthorized | Dashboard remains inaccessible |
| Log out and revisit dashboard | Redirect to login |
| Modify client-side authorization state | Protected backend data remains inaccessible |

### 16.3 Cross-Platform Tests

The application must be tested on:

- Web browser.
- Android emulator or physical device.
- iOS simulator or physical device.

Testing must verify that Google authentication, session management, domain validation, and logout behave consistently across supported platforms.

### 16.4 Responsive UI Tests

The application should be tested at:

- Desktop browser width.
- Tablet width.
- Mobile browser width.
- Native mobile screen sizes.

---

## 17. Acceptance Criteria

The assignment will be considered complete when the following conditions are met.

### Authentication

- [ ] Google Sign-In is implemented.
- [ ] Firebase Authentication is integrated.
- [ ] Users can authenticate using their Google accounts.
- [ ] The authenticated email is checked against the approved domain.
- [ ] Unauthorized users receive the required error message.
- [ ] Unauthorized users cannot access the dashboard.

### Application

- [ ] Login page is implemented.
- [ ] Dashboard page is implemented.
- [ ] Logout functionality works.
- [ ] Authentication loading states are implemented.
- [ ] Authentication errors are handled.
- [ ] Protected routes are implemented.
- [ ] Authentication state is maintained correctly.

### Cross-Platform

- [ ] Application runs on web.
- [ ] Application runs on Android.
- [ ] Application runs on iOS.
- [ ] Shared application logic is used across platforms.
- [ ] Responsive UI is implemented.

### Security

- [ ] Authorization does not depend solely on client-side validation.
- [ ] Authentication tokens are not exposed in URLs or logs.
- [ ] Protected data cannot be accessed without authorization.
- [ ] Environment secrets are excluded from version control.

### Submission

- [ ] GitHub repository is available.
- [ ] README includes setup instructions.
- [ ] README explains authentication and domain restriction.
- [ ] Deployment link is available.
- [ ] The deployed web application works correctly.

---

## 18. Deployment Requirements

### 18.1 Web Deployment

The web application should be deployed using Netlify or another suitable hosting provider.

The deployment must include:

- Production build.
- Environment configuration.
- HTTPS.
- Firebase authorized-domain configuration.
- Browser routing configuration.
- Successful Google authentication in production.

The hosting configuration must support direct navigation to the dashboard route without returning a server-side 404 error.

### 18.2 Firebase Configuration

The Firebase project must be configured with:

- Firebase Authentication enabled.
- Google sign-in provider enabled.
- Authorized web domains configured.
- Correct application configuration.
- Appropriate security rules if Firestore is used.

### 18.3 Mobile Configuration

The mobile application must include the appropriate platform-specific Google authentication configuration.

Android and iOS authentication credentials must be configured for the application package and bundle identifiers.

The mobile implementation must be tested independently of the deployed web application.

---

## 19. Repository and Documentation Requirements

The GitHub repository must include:

### README.md

The README must explain:

1. Project overview.
2. Features.
3. Technology stack.
4. Prerequisites.
5. Installation instructions.
6. Environment variable configuration.
7. Firebase setup.
8. Google authentication setup.
9. Domain restriction logic.
10. Web development instructions.
11. Android and iOS development instructions.
12. Production build instructions.
13. Deployment instructions.
14. Known limitations.

### Environment Configuration

The repository must include a `.env.example` file containing the required configuration variable names.

The actual environment file containing local configuration must not be committed.

### Deployment Link

The README should include the live deployment URL and any additional information required to test the application.

---

## 20. Project Milestones

| Milestone | Deliverable |
|---|---|
| 1. Project setup | Expo, React Native, TypeScript, and project structure |
| 2. Firebase configuration | Firebase project and Google authentication |
| 3. Authentication implementation | Google Sign-In and session management |
| 4. Domain authorization | Email validation and access restriction |
| 5. Navigation | Login page, dashboard, and protected routes |
| 6. UI implementation | Responsive styling and loading/error states |
| 7. Testing | Authentication, security, and cross-platform testing |
| 8. Deployment | Production web application |
| 9. Documentation | GitHub README and final submission |

---

## 21. Risks and Mitigation

| Risk | Mitigation |
|---|---|
| Unauthorized users access protected data | Enforce authorization through trusted backend or Firebase Security Rules |
| Google authentication fails on mobile | Configure platform-specific authentication credentials and test on devices |
| Authentication state is lost on refresh | Use Firebase-supported session persistence |
| Direct dashboard URL bypasses login | Implement protected navigation and backend authorization |
| Environment secrets are exposed | Use environment configuration and exclude sensitive files from Git |
| Web deployment breaks authentication | Configure production domains and test the deployed application |
| Unauthorized users remain authenticated | Sign out rejected users and clear application authentication state |

---

## 22. Future Enhancements

Potential future improvements include:

- Admin dashboard.
- User management.
- Role-based access control.
- User profile management.
- Firestore user database.
- Organization domain configuration.
- Multiple approved email domains.
- Audit logging.
- Multi-factor authentication.
- Account activity monitoring.

These enhancements are optional and should not delay the completion of the core assignment.

---

## 23. Final Deliverables

The completed project must provide:

1. A functional React Native application supporting web, Android, and iOS.
2. Google authentication using Firebase Authentication.
3. Domain-restricted application access.
4. A protected dashboard.
5. Logout functionality.
6. Responsive and professional UI.
7. A GitHub repository with complete documentation.
8. A live web deployment.
9. A README explaining setup, authentication flow, and domain restriction.

**Definition of Done:** The application is complete when an authorized user can authenticate using a Google account ending in `@hbplus.fit`, access the protected dashboard, and log out, while users from other domains are denied access across all supported platforms.

---

## 24. Additional Information for the Assignment Submission

The project will use a shared React Native codebase to support web and mobile platforms. Firebase Authentication will be used for Google sign-in and session management, while the application's authorization layer will restrict access to the approved organizational email domain.

The implementation will prioritize secure authentication, protected navigation, responsive UI, and maintainable code structure. The initial version will focus on the required authentication workflow, with role-based access and database integration treated as optional enhancements.
