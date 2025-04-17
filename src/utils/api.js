export function getCurrentUser() {
  return new Promise((resolve) => {
    resolve({ name: "Foo", email: "foo@example.com" });
  });
}
