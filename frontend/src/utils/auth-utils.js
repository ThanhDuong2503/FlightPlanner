export async function performLogin(username, password) {
  const response = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (response.status !== 200) {
    throw new Error(`failed to login: ${response.statusText}`);
  }

  return await response.text();
}

export async function performLoginWithGithub(code) {
  const response = await fetch('/auth/login/github', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (response.status !== 200) {
    throw new Error(`failed to login: ${response.statusText}`);
  }

  return await response.text();
}