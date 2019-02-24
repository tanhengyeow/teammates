package teammates.test.cases.webapi;

import java.io.File;
import java.net.URLConnection;

import org.apache.http.HttpStatus;
import org.testng.annotations.Test;

import teammates.common.datatransfer.attributes.AccountAttributes;
import teammates.common.util.Const;
import teammates.ui.webapi.action.JsonResult;
import teammates.ui.webapi.action.PostStudentProfilePictureAction;
import teammates.ui.webapi.output.StudentProfilePictureResults;

/**
 * SUT: {@link PostStudentProfilePictureAction}.
 */
public class PostStudentProfilePictureActionTest extends BaseActionTest<PostStudentProfilePictureAction> {
    @Override
    protected String getActionUri() {
        return Const.ResourceURIs.STUDENT_PROFILE_PICTURE;
    }

    @Override
    protected String getRequestMethod() {
        return POST;
    }

    @Override
    @Test
    public void testExecute() throws Exception {
        AccountAttributes student1 = typicalBundle.accounts.get("student1InCourse1");
        loginAsStudent(student1.googleId);

        ______TS("Typical case: upload profile picture operation successful");

        String filePath = "src/test/resources/images/profile_pic.png";
        String contentType = URLConnection.guessContentTypeFromName(new File(filePath).getName());

        PostStudentProfilePictureAction action = getActionWithParts("studentprofilephoto", contentType, filePath);
        JsonResult result = getJsonResult(action);

        assertEquals(HttpStatus.SC_OK, result.getStatusCode());

        StudentProfilePictureResults output = (StudentProfilePictureResults) result.getOutput();

        assertEquals(output.getMessage(), Const.StatusMessages.STUDENT_PROFILE_PICTURE_SAVED);
        assertNotNull(output.getPictureKey());
    }

    @Override
    @Test
    protected void testAccessControl() throws Exception {
        verifyInaccessibleWithoutLogin();
        verifyInaccessibleForUnregisteredUsers();
    }
}