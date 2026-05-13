import { BasicForm, RiskProfile } from '@/lib/signup/types';

export const AUTH_EVENT_NAME = 'gv-auth-change';

const USERS_KEY = 'gv-users';
const SESSION_KEY = 'gv-session';
const LEGACY_AUTH_KEY = 'gv-auth';

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  nickname: string;
  birthdate: string;
  phone: string;
  consentRequired: boolean;
  riskProfile: RiskProfile;
  riskScore: number;
  riskLabel: string;
  createdAt: string;
};

export type AuthUser = Omit<StoredUser, 'password'>;

type LoginResult =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string };

type SignupResult =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string };

const DEMO_USER: StoredUser = {
  id: 'demo-user',
  name: '테스트 사용자',
  email: 'test@gentleviking.com',
  password: '1234',
  nickname: '젠틀바이킹',
  birthdate: '1990-01-01',
  phone: '01012345678',
  consentRequired: true,
  riskProfile: {
    goal: 'STABLE',
    horizon: 'Y1TO3',
    lossTolerance: 'LT10',
    experience: 'STOCK_ETF',
    volatility: 'MID',
  },
  riskScore: 12,
  riskLabel: '위험중립형',
  createdAt: '2026-01-01T00:00:00.000Z',
};

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function toAuthUser(user: StoredUser): AuthUser {
  const safeUser = { ...user };
  delete (safeUser as Partial<StoredUser>).password;
  return safeUser as AuthUser;
}

function notifyAuthChange() {
  if (!canUseStorage()) return;
  window.dispatchEvent(new Event(AUTH_EVENT_NAME));
}

function readUsers(): StoredUser[] {
  if (!canUseStorage()) return [DEMO_USER];

  const rawUsers = window.localStorage.getItem(USERS_KEY);
  if (!rawUsers) {
    window.localStorage.setItem(USERS_KEY, JSON.stringify([DEMO_USER]));
    return [DEMO_USER];
  }

  try {
    const users = JSON.parse(rawUsers) as StoredUser[];
    if (!Array.isArray(users)) return [DEMO_USER];

    const hasDemoUser = users.some(
      (user) => normalizeEmail(user.email) === DEMO_USER.email,
    );

    if (hasDemoUser) return users;

    const nextUsers = [DEMO_USER, ...users];
    window.localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
    return nextUsers;
  } catch {
    window.localStorage.setItem(USERS_KEY, JSON.stringify([DEMO_USER]));
    return [DEMO_USER];
  }
}

function writeUsers(users: StoredUser[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function writeSession(email: string) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(SESSION_KEY, normalizeEmail(email));
  window.localStorage.setItem(LEGACY_AUTH_KEY, 'true');
  notifyAuthChange();
}

export function getUsers() {
  return readUsers().map(toAuthUser);
}

export function isEmailRegistered(email: string) {
  const targetEmail = normalizeEmail(email);
  if (!targetEmail) return false;

  return readUsers().some(
    (user) => normalizeEmail(user.email) === targetEmail,
  );
}

export function signupUser({
  basic,
  riskProfile,
  riskScore,
  riskLabel,
}: {
  basic: BasicForm;
  riskProfile: RiskProfile;
  riskScore: number;
  riskLabel: string;
}): SignupResult {
  const email = normalizeEmail(basic.email);

  if (isEmailRegistered(email)) {
    return {
      ok: false,
      message: '이미 가입된 이메일입니다. 로그인하거나 다른 이메일을 사용해주세요.',
    };
  }

  const users = readUsers();
  const user: StoredUser = {
    id: `user-${Date.now()}`,
    name: basic.name.trim(),
    email,
    password: basic.pw1,
    nickname: basic.nickname.trim(),
    birthdate: basic.birthdate,
    phone: basic.phone.replace(/\D/g, ''),
    consentRequired: basic.consetRequired,
    riskProfile,
    riskScore,
    riskLabel,
    createdAt: new Date().toISOString(),
  };

  writeUsers([...users, user]);
  writeSession(user.email);

  return { ok: true, user: toAuthUser(user) };
}

export function loginUser(email: string, password: string): LoginResult {
  const normalizedEmail = normalizeEmail(email);
  const matchedUser = readUsers().find(
    (user) => normalizeEmail(user.email) === normalizedEmail,
  );

  if (!matchedUser || matchedUser.password !== password) {
    return {
      ok: false,
      message: '이메일 또는 비밀번호가 올바르지 않습니다.',
    };
  }

  writeSession(matchedUser.email);
  return { ok: true, user: toAuthUser(matchedUser) };
}

export function logoutUser() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(SESSION_KEY);
  window.localStorage.removeItem(LEGACY_AUTH_KEY);
  notifyAuthChange();
}

export function getCurrentUser(): AuthUser | null {
  if (!canUseStorage()) return null;

  const sessionEmail = window.localStorage.getItem(SESSION_KEY);
  if (!sessionEmail) return null;

  const matchedUser = readUsers().find(
    (user) => normalizeEmail(user.email) === normalizeEmail(sessionEmail),
  );

  return matchedUser ? toAuthUser(matchedUser) : null;
}
