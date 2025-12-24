export interface FormModel {
  fullName: string;
  documentNumber: string;
  email: string;
  phone: string;
  nitNumber: string;
  city: string;
  economicSector: string;
  numberEmployees: string;
  address: string;
  acceptsPolicy: boolean;
}

export interface ModuleQuestionsForm {
  question1: boolean;
  question2: boolean;
  question3: boolean;
  question4: boolean;
  question5: boolean;
  question6: boolean;
}

export interface DiagnosticFormModel {
  module1: ModuleQuestionsForm;
  module2: ModuleQuestionsForm;
  module3: ModuleQuestionsForm;
  module4: ModuleQuestionsForm;
  module5: ModuleQuestionsForm;
  module6: ModuleQuestionsForm;
  module7: ModuleQuestionsForm;
  module8: ModuleQuestionsForm;
  module9: ModuleQuestionsForm;
  module10: ModuleQuestionsForm;
}

export interface ModuleQuestionsResultModel {
  question1: number;
  question2: number;
  question3: number;
  question4: number;
  question5: number;
  question6: number;
}

export interface DiagnosticResultModel {
  module1: ModuleQuestionsResultModel;
  module2: ModuleQuestionsResultModel;
  module3: ModuleQuestionsResultModel;
  module4: ModuleQuestionsResultModel;
  module5: ModuleQuestionsResultModel;
  module6: ModuleQuestionsResultModel;
  module7: ModuleQuestionsResultModel;
  module8: ModuleQuestionsResultModel;
  module9: ModuleQuestionsResultModel;
  module10: ModuleQuestionsResultModel;
}
