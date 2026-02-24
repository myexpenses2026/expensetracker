namespace com.myorg.expense.tracker;

using { managed, cuid, sap.common.CodeList } from '@sap/cds/common';

entity Budgets : managed, cuid {
  name        : String                     @title : 'Budget Description';                   
  totalBudget : Decimal(15, 2)             @title : 'Total Budget';          
  spent       : Decimal(15, 2) default 0   @title : 'Spent Budget'; 
  remaining   : Decimal(15, 2)             @title : 'Remaining Budget';           

  //Associations
  expenses    : Association to many Expenses on expenses.budget = $self;
}

type ExpenseType : String enum { 
    Food       = 'F' @title: 'Food & Drink'; 
    Travel     = 'T' @title: 'Transport'; 
    Leisure    = 'L' @title: 'Entertainment';
    Grrocery   = 'G' @title: 'Grocery';
    Utility    = 'B' @title: 'Utility';
    Other      = 'O' @title: 'Miscellaneous';
}

entity ExpenseTypes : CodeList {
  key ID : String(1); // Standard practice to use short codes (F, T, L, etc.)
}

entity Expenses : managed, cuid {
  description : String                            @title : 'Expenses Description';          
  type        : Association to ExpenseTypes       @title : 'Expenses Type' ; 
  //type        : ExpenseType                       @title : 'Expenses Type' ;    
  amount      : Decimal(15, 2)                    @title : 'Amount';  

  //Associations
  budget      : Association to Budgets;
}
