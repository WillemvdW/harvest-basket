# Contributing to Harvest Basket

Thank you for your interest in contributing to Harvest Basket! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## Getting Started

### Prerequisites
- Node.js v20.11.1+ (managed with NVM)
- npm v10.2.4+
- Git

### Setup Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/harvest-basket.git
   cd harvest-basket
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/harvest-basket.git
   ```

4. **Install dependencies**:
   ```bash
   nvm use
   npm install
   ```

5. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Guidelines

### Code Style

- **TypeScript**: Strict mode enabled
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Formatting**: 2-space indentation
- **Line Length**: Max 100 characters when reasonable

### Component Development

```typescript
// Good: Functional component with TypeScript
interface ComponentProps {
  title: string;
  onClose: () => void;
}

export default function Component({ title, onClose }: ComponentProps) {
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

// Good: Use React hooks for state
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### CSS/Styling

- Use **Tailwind CSS** utility classes exclusively
- Avoid inline styles
- Follow Tailwind's responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Use dark mode classes when appropriate

```typescript
// Good
<div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
  Content
</div>

// Bad
<div style={{ backgroundColor: 'white', padding: '16px' }}>
  Content
</div>
```

### Validation

Always use the validation utilities:

```typescript
import { validateEmail, validatePassword } from '../utils/validation';

const emailResult = validateEmail(email);
if (!emailResult.isValid) {
  console.error(emailResult.errors);
}
```

### Security

- Never hardcode sensitive information
- Use environment variables for secrets
- Hash passwords with provided utilities
- Validate all user inputs
- Sanitize data before display

## Testing Your Changes

### Run Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` and test your changes.

### Lint Your Code
```bash
npm run lint
```

### Build for Production
```bash
npm run build
```

### Test Features
- Test authentication flows
- Test form validation
- Test responsive design (mobile, tablet, desktop)
- Test across browsers (Chrome, Firefox, Safari)

## Commit Guidelines

Follow conventional commits:

```
type(scope): description

feat(auth): add two-factor authentication
fix(cart): resolve quantity update issue
docs(setup): add NVM installation steps
style(header): improve responsive design
refactor(context): simplify state management
test(validation): add email validation tests
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting, missing semicolons)
- `refactor`: Code reorganization without changing behavior
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, tooling

## Pull Request Process

1. **Update your branch** with latest main:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Open a Pull Request** on GitHub with:
   - Clear title and description
   - Reference to related issues
   - Screenshots for UI changes
   - Checklist of testing performed

4. **PR Template** (use this):
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## How to Test
   Steps to verify the changes work

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex logic
   - [ ] Documentation updated
   - [ ] No new warnings generated
   - [ ] Tested on multiple browsers
   - [ ] Responsive design verified
   ```

5. **Address feedback** from reviewers

6. **Rebase if needed**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   git push origin feature/your-feature-name --force-with-lease
   ```

## Feature Development Examples

### Adding a New Page

1. Create component in `src/pages/MyPage.tsx`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Header.tsx`
4. Test the route navigation

### Adding a New Utility

1. Create in `src/utils/myUtil.ts`
2. Export from `src/utils/index.ts`
3. Add TypeScript types
4. Document with comments
5. Add test examples in comments

### Adding a New Context

1. Create in `src/context/MyContext.tsx`
2. Define interfaces for context values
3. Export hook: `useMyContext()`
4. Add provider to `src/App.tsx`
5. Document all methods

## Documentation

- Update README.md for user-facing changes
- Update SETUP.md for setup/environment changes
- Add JSDoc comments to complex functions
- Include examples for utility functions

```typescript
/**
 * Validate email format
 * @param email - Email address to validate
 * @returns Validation result with errors array
 * @example
 * const result = validateEmail('test@example.com');
 * if (result.isValid) {
 *   console.log('Valid email!');
 * } else {
 *   console.error(result.errors);
 * }
 */
export const validateEmail = (email: string): ValidationResult => {
  // implementation
};
```

## Reporting Bugs

### Before reporting:
- Check existing issues
- Reproduce with latest code
- Test with different browsers
- Check if it's a setup issue

### When reporting:
```markdown
## Bug Description
Clear description of the bug

## Reproduction Steps
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable

## Environment
- Node.js version: (run `node --version`)
- npm version: (run `npm --version`)
- OS: (Windows/macOS/Linux)
- Browser: (Chrome/Firefox/Safari)
```

## Feature Requests

```markdown
## Feature Description
Clear description of the requested feature

## Use Case
Why this feature is needed

## Proposed Solution
How you think it should work

## Alternatives
Other approaches considered
```

## Review Process

- **All PRs require review** before merging
- Reviewers check:
  - Code quality and style
  - Security implications
  - Performance impact
  - Documentation accuracy
  - Test coverage

## Branch Protection Rules

- Main branch is protected
- All PRs require at least 1 approval
- All checks must pass
- History must be kept clean

## Versioning

This project follows Semantic Versioning:
- `MAJOR`: Breaking changes
- `MINOR`: New features
- `PATCH`: Bug fixes

Example: `v1.2.3`

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create git tag: `git tag v1.2.3`
4. Push tag: `git push origin v1.2.3`
5. Create GitHub Release with changelog

## Questions?

- **Documentation**: Check [SETUP.md](./SETUP.md) and [README.md](./README.md)
- **Issues**: Search GitHub Issues
- **Discussions**: Use GitHub Discussions
- **Email**: Contact project maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Harvest Basket! 🌾**
