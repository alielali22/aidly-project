# Postman Workspace – Aidly

## Files
- Aidly API.postman_collection.json
- Aidly Local.postman_environment.json

## Import
1) Open Postman → Import both JSON files.
2) Select env "Aidly Local" with `base_url=http://localhost:4000/api`.

## Flow (5 minutes)
1. Auth → Login (Admin) → sets {{token_admin}}
2. Categories → Create → saves {{categoryId}}
3. Articles → Create → saves {{articleId}}
4. Quizzes → Create/Add questions/Start/Submit → saves {{quizId}}
5. Scores → GET /scores/me (Learner) → Admin can PATCH /scores/:id
