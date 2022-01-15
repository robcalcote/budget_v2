INSERT INTO Users (Active, FirstName, LastName, Username, Password)
VALUES
  ('True', 'fname_test1', 'lname_test1', 'test', 'pbkdf2:sha256:50000$TCI4GzcX$0de171a4f4dac32e3364c7ddc7c14f3e2fa61f2d17574483f7ffbb431b4acb2f'),
  ('False', 'fname_test2', 'lname_test2', 'other', 'pbkdf2:sha256:50000$kJPKsz6N$d2d4784f1b030a9761f5ccaeeaca413f27f2ecb76d6168407af962ddce849f79');

INSERT INTO Transactions (UserId, CategoryId, MonthId, Organization, Amount)
VALUES
  ('1', '2', '3', 'Costco', 102.56);