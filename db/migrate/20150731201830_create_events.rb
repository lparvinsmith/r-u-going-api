class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.datetime :occurs_at, null: false
      t.string :title, null: false
      t.string :venue, null: false
      t.references :user, index: true, foreign_key: true, null: false
      t.text :description

      t.timestamps null: false
    end
  end
end
