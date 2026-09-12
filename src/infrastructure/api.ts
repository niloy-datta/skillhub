// Mock API client for Skillhub

const API_BASE_URL = 'https://api.skillhub.com'; // Replace with actual API URL

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export class Api {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', headers = {}, body } = options;

    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...headers,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, config);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new ApiError(response.status, error.message);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Network error');
    }
  }

  // Missions
  async getMissions() {
    return this.request<any[]>('/missions');
  }

  async getMission(id: string) {
    return this.request<any>(`/missions/${id}`);
  }

  async createMission(data: any) {
    return this.request<any>('/missions', { method: 'POST', body: data });
  }

  async updateMission(id: string, data: any) {
    return this.request<any>(`/missions/${id}`, { method: 'PUT', body: data });
  }

  async deleteMission(id: string) {
    return this.request<void>(`/missions/${id}`, { method: 'DELETE' });
  }

  // Workers
  async getWorkers() {
    return this.request<any[]>('/workers');
  }

  async getWorker(id: string) {
    return this.request<any>(`/workers/${id}`);
  }

  async updateWorker(id: string, data: any) {
    return this.request<any>(`/workers/${id}`, { method: 'PUT', body: data });
  }

  // Companies
  async getCompanies() {
    return this.request<any[]>('/companies');
  }

  async getCompany(id: string) {
    return this.request<any>(`/companies/${id}`);
  }

  // Tasks
  async getTasks() {
    return this.request<any[]>('/tasks');
  }

  async getTask(id: string) {
    return this.request<any>(`/tasks/${id}`);
  }

  async createTask(data: any) {
    return this.request<any>('/tasks', { method: 'POST', body: data });
  }

  // Jobs
  async getJobs() {
    return this.request<any[]>('/jobs');
  }

  async getJob(id: string) {
    return this.request<any>(`/jobs/${id}`);
  }

  async createJob(data: any) {
    return this.request<any>('/jobs', { method: 'POST', body: data });
  }

  // Auth
  async login(email: string, password: string) {
    const response = await this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    this.setToken(response.token);
    return response;
  }

  async register(data: any) {
    const response = await this.request<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: data,
    });
    this.setToken(response.token);
    return response;
  }

  async logout() {
    this.clearToken();
  }

  async getCurrentUser() {
    return this.request<any>('/auth/me');
  }

  // User
  async updateUser(data: any) {
    return this.request<any>('/users/me', { method: 'PUT', body: data });
  }

  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'POST',
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new ApiError(response.status, 'Upload failed');
    }

    return response.json();
  }
}

// Export singleton instance
export const api = new Api();
