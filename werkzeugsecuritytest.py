from werkzeug.security import generate_password_hash, check_password_hash

hashed_pw = generate_password_hash("chalk")
bad_check = check_password_hash(hashed_pw, "cheese")
good_check = check_password_hash(hashed_pw, "chalk")

print(f"{bad_check}\n{good_check}")