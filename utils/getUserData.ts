
export const get_user_from_session = async () => {
  const fetch_session = await fetch("/api/auth/session");
  const my_session = await fetch_session.json();
  if (my_session?.user) {
    const form_data = new FormData();
    form_data.set("id", my_session?.user.id);
    const fetch_user = await fetch("/api/myadmin/users/find_user", {
      method: "POST",
      body: form_data,
    });
    const user_response = await fetch_user.json();
    if (user_response) {
      // setUser(user_response.data)
      return user_response.data;
    }
  }
  return null;
};
