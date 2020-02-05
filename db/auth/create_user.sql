INSERT INTO users (username, password, email, profile_img, is_admin)
VALUES ($1, $2, $3, $4, $5)
RETURNING *