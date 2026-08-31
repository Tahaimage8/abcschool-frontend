# Frontend Implementation Plan

## Phase 1: Dashboard Layout & Sidebar

### Files to Create
- `src/app/(dashboard)/layout.tsx` - Dashboard layout wrapper with sidebar
- `src/components/dashboard/Sidebar.tsx` - Collapsible sidebar (role-aware)
- `src/components/dashboard/SidebarNavItem.tsx` - Individual nav link component
- `src/components/dashboard/DashboardHeader.tsx` - Top bar with user menu
- `src/components/dashboard/index.ts` - Barrel exports

### Files to Modify
- `src/middleware.ts` - Add `/dashboard/numbers` matcher + role check (`ADMIN` | `CLASS_TEACHER`)
- `src/app/dashboard/page.tsx` - Update to use new layout

### Sidebar Navigation Items

| Route | Label | Icon | ADMIN | CLASS_TEACHER | PRINCIPAL |
|-------|-------|------|-------|---------------|-----------|
| `/dashboard` | Overview | LayoutDashboard | ✅ | ✅ | ✅ |
| `/dashboard/numbers` | Number Entry | PlusCircle | ✅ | ✅ | ❌ |
| `/dashboard/history` | History | History | ✅ | ✅ | ✅ |
| `/dashboard/settings` | Settings | Settings | ✅ | ✅ | ✅ |

### Middleware Logic
```typescript
// Matchers:
const protectedRoutes = ['/dashboard/:path*']
const numberEntryRoutes = ['/dashboard/numbers/:path*']

// Logic for /dashboard/numbers:
if (!session || !['ADMIN', 'CLASS_TEACHER'].includes(userRole)) {
  return redirect('/dashboard?error=forbidden')
}
```

---

## Phase 2: Number Entry Form

### Files to Create
- `src/app/(dashboard)/dashboard/numbers/page.tsx` - Number entry form
- `src/lib/types/numbers.ts` - TypeScript interfaces
- `src/lib/api/mockNumbers.ts` - Mock API (localStorage)
- `src/hooks/useNumbers.ts` - React hooks for form/history

### Form Fields
- **My Name** (prefilled from session, editable)
- **10 Mobile Number Inputs** (type="tel", required, Bangladeshi mobile format validation)
- **Submit Button** → POST to mock API

### Validation Rules
- Name required
- Mobile Number (primary): must match Bangladeshi format `01[3-9]XXXXXXXX` (11 digits, starting 013–019)
- Exactly 10 mobile numbers required (Mobile Number 1–10)
- Each of the 10 numbers: same Bangladeshi mobile format as above — not a plain 0–1000 number anymore

---

## Phase 3: History Page

### Files to Create
- `src/app/(dashboard)/dashboard/history/page.tsx` - History list with mock data

### Features
- Table/list of past entries
- Columns: Date, Name, Numbers, Actions
- Data from localStorage (mock)
- Responsive design

---

## Phase 4: Settings & Polish

### Files to Create
- `src/app/(dashboard)/dashboard/settings/page.tsx` - Settings placeholder

### Polish Items
- Loading states
- Error handling with toast notifications
- Responsive sidebar (mobile drawer)
- Empty states

---

## Phase 5: Backend Integration (Later)

### Files to Modify
- `src/lib/api/numbers.ts` - Real API client (replace mock)
- `src/hooks/useNumbers.ts` - Update to use real API
- `.env.local` - Add `NEXT_PUBLIC_API_URL`
- Delete `src/lib/api/mockNumbers.ts`

---

## Git Commit Strategy

### Branch Structure
```
main
  ├─ feat/dashboard-layout
  ├─ feat/middleware-role-guard
  ├─ feat/number-entry-form
  ├─ feat/history-page
  ├─ feat/settings-placeholder
  └─ feat/integration
```

### Commit Messages
1. `feat(dashboard): add layout wrapper with collapsible sidebar`
2. `feat(auth): add role-based middleware protection`
3. `feat(numbers): add number entry form with 10 inputs`
4. `feat(numbers): add history page with mock data`
5. `feat(dashboard): add settings placeholder page`
6. `feat(integration): connect frontend to backend API`