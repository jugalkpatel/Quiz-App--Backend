function deleteCookies(res) {
  res.cookie("accessToken", {
    maxAge: 0,
    httpOnly: true,
  });

  res.cookie("refreshToken", {
    maxAge: 0,
    httpOnly: true,
  });
}

export { deleteCookies };
