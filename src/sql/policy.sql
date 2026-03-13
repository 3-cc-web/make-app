-- SQL Editorから登録するポリシー候補

-- 全員に商品情報のReadを許可
create policy "product_select"
on public.product
for select
to public
using (true);

-- 全員にマイセットのReadを許可
create policy "myset_select"
on public.myset
for select
to public
using (true);

-- on…テーブル名
-- for…操作名
-- to public…誰が（publicだと全員）
-- using (true)…全行取得OK

CREATE POLICY "allow upload qf0l9g_0" 
ON storage.objects 
FOR INSERT TO anon 
WITH CHECK (bucket_id = 'clothes_image');


