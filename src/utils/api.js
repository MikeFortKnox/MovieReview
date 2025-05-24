export function getCurrentUser() {
  return new Promise((resolve) => {
    resolve({
      name: "Mike",
      avatar:
        "https://plus.unsplash.com/premium_photo-1682656220562-32fde8256295?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "mike@example.com",
    });
  });
}
