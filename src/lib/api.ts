const URLS = {
  auth: 'https://functions.poehali.dev/eec26f57-3f66-4498-81e6-15667826dddc',
  volunteer: 'https://functions.poehali.dev/e5843606-7404-40e0-9342-12702f4786fa',
  api: 'https://functions.poehali.dev/4f6c15b1-704d-4f30-81af-c59c9df857b8',
  admin: 'https://functions.poehali.dev/5b029188-d86f-422e-932a-7d287204da49',
}

async function call(url: string, body: object, userId?: number) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (userId) headers['X-User-Id'] = String(userId)
      const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) })
      if (res.status === 402) return { error: 'Превышен лимит запросов. Попробуйте позже.' }
      const text = await res.text()
      try {
        const data = JSON.parse(text)
        if (typeof data === 'string') return JSON.parse(data)
        return data
      } catch {
        return { error: 'parse_error' }
      }
    } catch {
      if (attempt === 1) return { error: 'network_error' }
      await new Promise(r => setTimeout(r, 1500))
    }
  }
  return { error: 'network_error' }
}

export const auth = {
  login: (email: string, password: string) =>
    call(URLS.auth, { action: 'login', email, password }),
  register: (email: string, password: string, full_name: string) =>
    call(URLS.auth, { action: 'register', email, password, full_name }),
}

export const publicApi = {
  news: () => call(URLS.api, { action: 'news' }),
  documents: () => call(URLS.api, { action: 'documents' }),
  events: () => call(URLS.api, { action: 'events' }),
  volunteers: () => call(URLS.api, { action: 'volunteers' }),
  contests: () => call(URLS.api, { action: 'contests' }),
  siteContent: () => call(URLS.api, { action: 'site_content' }),
}

export const volunteerApi = {
  profile: (userId: number) => call(URLS.volunteer, { action: 'profile' }, userId),
  updateProfile: (userId: number, data: object) => call(URLS.volunteer, { action: 'profile_update', ...data }, userId),
  myEvents: (userId: number) => call(URLS.volunteer, { action: 'my_events' }, userId),
  registerEvent: (userId: number, event_id: number) => call(URLS.volunteer, { action: 'register_event', event_id }, userId),
  contests: (userId: number) => call(URLS.volunteer, { action: 'contests' }, userId),
  rating: (userId: number) => call(URLS.volunteer, { action: 'rating' }, userId),
}

export const adminApi = {
  newsList: (userId: number) => call(URLS.admin, { action: 'news_list' }, userId),
  newsCreate: (userId: number, data: object) => call(URLS.admin, { action: 'news_create', ...data }, userId),
  newsUpdate: (userId: number, data: object) => call(URLS.admin, { action: 'news_update', ...data }, userId),
  newsDelete: (userId: number, id: number) => call(URLS.admin, { action: 'news_delete', id }, userId),
  docsList: (userId: number) => call(URLS.admin, { action: 'docs_list' }, userId),
  docsCreate: (userId: number, data: object) => call(URLS.admin, { action: 'docs_create', ...data }, userId),
  docsUpdate: (userId: number, data: object) => call(URLS.admin, { action: 'docs_update', ...data }, userId),
  docsDelete: (userId: number, id: number) => call(URLS.admin, { action: 'docs_delete', id }, userId),
  eventsList: (userId: number) => call(URLS.admin, { action: 'events_list' }, userId),
  eventsCreate: (userId: number, data: object) => call(URLS.admin, { action: 'events_create', ...data }, userId),
  eventsUpdate: (userId: number, data: object) => call(URLS.admin, { action: 'events_update', ...data }, userId),
  eventsDelete: (userId: number, id: number) => call(URLS.admin, { action: 'events_delete', id }, userId),
  volunteersList: (userId: number) => call(URLS.admin, { action: 'volunteers_list' }, userId),
  volunteerUpdate: (userId: number, data: object) => call(URLS.admin, { action: 'volunteer_update', ...data }, userId),
  contestsList: (userId: number) => call(URLS.admin, { action: 'contests_list' }, userId),
  contestsCreate: (userId: number, data: object) => call(URLS.admin, { action: 'contests_create', ...data }, userId),
  contestsUpdate: (userId: number, data: object) => call(URLS.admin, { action: 'contests_update', ...data }, userId),
  contestsDelete: (userId: number, id: number) => call(URLS.admin, { action: 'contests_delete', id }, userId),
  contentList: (userId: number) => call(URLS.admin, { action: 'content_list' }, userId),
  contentUpdate: (userId: number, items: {key: string, value: string}[]) => call(URLS.admin, { action: 'content_update', items }, userId),
}

export const publicApi2 = {
  siteContent: () => call(URLS.api, { action: 'site_content' }),
}