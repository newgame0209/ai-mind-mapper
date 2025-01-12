# Database Design

## データベース概要
- データベース名: `ai_mind_map_db`
- 利用想定: SQLite（MVP時点）  
  - 将来的な拡張に合わせて MySQL/PostgreSQL 等への移行も検討可能

## テーブル設計

### テーブル: `mind_maps`
| カラム名       | 型        | 説明                                                         | 制約                           |
| -------------- | --------- | ------------------------------------------------------------ | ------------------------------ |
| id             | integer   | 主キー、マインドマップID                                    | PRIMARY KEY, AUTOINCREMENT     |
| source_type    | string    | `"pdf"`または`"web"`                                         | NOT NULL                       |
| source_url     | text      | PDFの場合はファイル格納先、Webの場合はURL                   |                                 |
| summary_text   | text      | AI要約した文章                                               |                                 |
| mindmap_data   | text      | マインドマップ構造（JSON等）                                 |                                 |
| created_at     | datetime  | レコード作成時刻                                             | DEFAULT CURRENT_TIMESTAMP      |
| updated_at     | datetime  | レコード更新時刻                                             | DEFAULT CURRENT_TIMESTAMP      |

- **拡張性**  
  - MVPの範囲では 1 テーブルで十分。必要に応じて別テーブル（ユーザー管理等）を追加可能。