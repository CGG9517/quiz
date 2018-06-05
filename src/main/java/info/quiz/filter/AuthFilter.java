package info.quiz.filter;


import info.quiz.po.User;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;


/**
 * 用户从web访问时的权限控制。主要是网页重定向
 * 
 */
public class AuthFilter implements javax.servlet.Filter {
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		System.out.println("初始化过滤器....");
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
			throws IOException, ServletException
	{

		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) resp;
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		String url = request.getRequestURI();

		if (user == null)
		{
			System.out.println("用户未登录...");
			// 未登录时以下三个网页都禁止
			if (	url.endsWith("admin.jsp")
					|| url.endsWith("home.jsp")
					|| url.endsWith("myquiz.jsp"))
			{
				response.sendRedirect("login.jsp");
			}
		}
		else {
			if (	url.endsWith("admin.jsp") && !user.getIsadmin()){
				System.out.println("非管理员权限...");
				response.sendRedirect("home.jsp");
			}
			if (url.endsWith("login.jsp")) {
				System.out.println("用户已登陆...");
				response.sendRedirect("home.jsp");
			}
		}
		chain.doFilter(request,response);
	}

	@Override
	public void destroy() {

	}

}
