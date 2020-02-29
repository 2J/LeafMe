package db

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql" // MySQL driver // MySQL driver
)

// Open : Opens DB conection
func Open() *sql.DB {
	username := "root"
<<<<<<< HEAD
	password := "DB_PASSWORD"
=======
	password := "1mLJZrSRAfUV10Wi7io"
>>>>>>> c15b79351baf947021895c44236c273f6891297a
	protocol := "tcp"
	address := "mysql"
	port := "3306"
	dbname := "leafme"
	db, _ := sql.Open("mysql",
		username+":"+password+"@"+protocol+"("+address+":"+port+")/"+dbname+"?parseTime=true")
	return db
}

// Close : Close DB connection
func Close(db *sql.DB) {
	db.Close()
}
