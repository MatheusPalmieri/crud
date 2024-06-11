import { User, UserStatus } from '@/interfaces/user';

export const newUser = (user: any) => {
  const usersString = localStorage.getItem('@system:users') || '[]';
  const users = JSON.parse(usersString);

  user.id = users[users.length - 1]?.id + 1 || 1;
  user.status = UserStatus.ACTIVE;
  user.createdAt = new Date().toISOString();
  user.updatedAt = new Date().toISOString();

  users.push(user);

  localStorage.setItem('@system:users', JSON.stringify(users));

  return { success: true };
};

export const getUsers = (page = 1, limit = 10) => {
  const usersString = localStorage.getItem('@system:users') || '[]';
  const users = JSON.parse(usersString);

  return {
    users: users
      .filter((u: User) => u.status === UserStatus.ACTIVE)
      .slice((page - 1) * limit, page * limit),
    total: users.filter((u: User) => u.status === UserStatus.ACTIVE).length,
    page,
    limit,
  };
};

export const getUser = (id: string) => {
  const usersString = localStorage.getItem('@system:users') || '[]';
  const users = JSON.parse(usersString);

  return users.find((u: User) => String(u.id) === String(id));
};

export const updateUser = (user: any) => {
  const usersString = localStorage.getItem('@system:users') || '[]';
  const users = JSON.parse(usersString);

  const index = users.findIndex((u: User) => String(u.id) === String(user.id));

  users[index] = user;
  users[index].updatedAt = new Date().toISOString();

  localStorage.setItem('@system:users', JSON.stringify(users));

  return { success: true };
};

export const deleteUser = (id: string) => {
  const usersString = localStorage.getItem('@system:users') || '[]';
  const users = JSON.parse(usersString);

  const index = users.findIndex((u: User) => String(u.id) === String(id));

  users[index].status = UserStatus.INACTIVE;
  users[index].updatedAt = new Date().toISOString();

  localStorage.setItem('@system:users', JSON.stringify(users));

  return { success: true };
};
